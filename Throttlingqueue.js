let last500ErrorTime = 0;
const ERROR_THROTTLE_INTERVAL = 10000; // 10 seconds

function* handleQueueFloor(action) {
    const now = Date.now();

    // Throttle API call if last 500 was recent
    if (now - last500ErrorTime < ERROR_THROTTLE_INTERVAL) {
        console.warn('Skipping API call due to recent 500 error.');
        return;
    }

    try {
        const userProfile = yield select(makeSelectUserProfileData());
        const { timeZoneOffset = 0, orderLocation } = userProfile || {};

        action.request['time_zone_offset'] = timeZoneOffset;
        action.request['location'] = orderLocation;

        if (isIpad() && isEmpty(action.request.location)) {
            console.log('act', action, userProfile);
        }

        if (isEmpty(action.request?.location)) {
            action.request['location'] = sessionStorage.getItem('location');
        }

        const { data, errors } = yield call(createSOECall(showCustomerCheckinEndpoint, action.request));

        // Only handle if call returns errors
        const error = errors?.[0] || null;
        if (error) {
            yield put(setError(error));
            yield call(logger.logJsErrorToServer, error);
        } else {
            yield put(setQueueFloor(data?.customers || {}));
            last500ErrorTime = 0; // reset throttle on success
        }

    } catch (e) {
        const statusCode = e?.response?.status || e?.status || null;
        const now = Date.now();
        e.name = COMPONENT.QUEUE;

        if (statusCode === 500) {
            if (now - last500ErrorTime > ERROR_THROTTLE_INTERVAL) {
                last500ErrorTime = now;
                yield all([
                    put(setError(e.message)),
                    call(logger.logJsErrorToServer, e)
                ]);
            } else {
                console.warn('500 error caught and throttled — not logging again yet.');
            }
        } else {
            // Log all non-500 errors
            yield all([
                put(setError(e.message)),
                call(logger.logJsErrorToServer, e)
            ]);
        }
    }
}
