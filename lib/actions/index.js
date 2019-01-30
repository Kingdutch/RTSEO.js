export const UPDATE_KEYWORD = 'UPDATE_KEYWORD';
export const ASSESS_PAPER = 'ASSESS_PAPER';

export const updateKeyword = (keyword) => ({
  type: UPDATE_KEYWORD,
  payload: keyword,
});

export const assessPaper = (keyword, seoScore, seoAssessments, contentScore, contentAssessments) => ({
  type: ASSESS_PAPER,
  payload: {
    keyword,
    seoScore,
    seoAssessments,
    contentScore,
    contentAssessments
  }
});
