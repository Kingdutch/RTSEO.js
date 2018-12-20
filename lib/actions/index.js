export const UPDATE_KEYWORD = 'UPDATE_KEYWORD';

export const updateKeyword = (keyword) => (console.log('update'), {
  type: UPDATE_KEYWORD,
  payload: keyword,
})
