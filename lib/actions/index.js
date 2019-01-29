export const UPDATE_KEYWORD = 'UPDATE_KEYWORD';
export const ASSESS_PAPER = 'ASSESS_PAPER';

export const updateKeyword = (keyword) => (console.log('update'), {
  type: UPDATE_KEYWORD,
  payload: keyword,
});

export const assessPaper = (keyword, contentScore, contentAssessments) => ({
  type: ASSESS_PAPER,
  payload: {
    keyword,
    contentScore,
    contentAssessments
  }
});
