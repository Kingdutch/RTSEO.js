export const UPDATE_KEYWORD = 'UPDATE_KEYWORD';
export const UPDATE_META_TITLE = 'UPDATE_META_TITLE';
export const UPDATE_META_DESCRIPTION = 'UPDATE_META_DESCRIPTION';
export const ASSESS_PAPER = 'ASSESS_PAPER';

export const updateKeyword = (keyword) => ({
  type: UPDATE_KEYWORD,
  payload: keyword,
});

export const updateMetaTitle = (title) => ({
  type: UPDATE_META_TITLE,
  payload: title,
});

export const updateMetaDescription = (descr) => ({
  type: UPDATE_META_DESCRIPTION,
  payload: descr,
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
