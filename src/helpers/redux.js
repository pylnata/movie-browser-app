export const createActionCreator = (type, actionProps) => {
  return {
    type,
    ...actionProps
  };
};

export const createActionsForAsyncAction = (
  actionKey,
  actionHandlerKeyFuncs = {}
) => {
  const startHandlerFn = actionHandlerKeyFuncs.START;
  const successHandlerFn = actionHandlerKeyFuncs.SUCCESS;
  const failHandlerFn = actionHandlerKeyFuncs.FAIL;
  return {
    start: startHandlerFn
      ? startHandlerFn
      : request => createActionCreator(`${actionKey}_START`, { request }),
    success: successHandlerFn
      ? successHandlerFn
      : data => createActionCreator(`${actionKey}_SUCCESS`, { data }),
    fail: failHandlerFn
      ? failHandlerFn
      : error => createActionCreator(`${actionKey}_FAIL`, { error })
  };
};

export const createReducer = (
  initialState = {},
  actionHandlerKeyFuncs = {}
) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  };
};

const initialAsyncState = {
  isLoading: false,
  error: null,
  data: undefined,
  request: undefined
};

export const createAsyncReducerMap = (
  actionKey,
  actionHandlerKeyFuncs = {}
) => {
  const startReducerOverrideFn = actionHandlerKeyFuncs[`${actionKey}_START`];
  const successReducerOverrideFn =
    actionHandlerKeyFuncs[`${actionKey}_SUCCESS`];
  const failReducerOverrideFn = actionHandlerKeyFuncs[`${actionKey}_FAIL`];

  const startReducerFn = startReducerOverrideFn
    ? startReducerOverrideFn
    : (state, action) => ({
        ...state,
        isLoading: true,
        error: null,
        request: action.request
      });

  const successReducerFn = successReducerOverrideFn
    ? successReducerOverrideFn
    : (state, action) => ({
        ...state,
        isLoading: false,
        error: null,
        data: action.data
      });

  const failReducerFn = failReducerOverrideFn
    ? failReducerOverrideFn
    : (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
      });

  return {
    [`${actionKey}_START`]: startReducerFn,
    [`${actionKey}_SUCCESS`]: successReducerFn,
    [`${actionKey}_FAIL`]: failReducerFn
  };
};

export const createAsyncReducer = (
  actionKey,
  actionHandlerKeyFuncs = {},
  initialState = initialAsyncState
) => {
  return createReducer(
    initialState,
    createAsyncReducerMap(actionKey, actionHandlerKeyFuncs)
  );
};
