import {ASSESS_PAPER, UPDATE_KEYWORD} from "../actions";
import paperReducer from "./paper";

const initialState = {
  isRendering: false,
  selectedKeyword: '',
  paper: {
    locale: 'en_US',
    url: '',
    permalink: '',
    title: '',
    titleWidth: '',
    description: '',
    text: '',
  },
  keywords: [],
  analysis: {
    /* keyword: initialAnalysisState */
  },
};

const initialAnalysisState = {
  seoScore: -1,
  contentScore: -1,
  isAnalysing: false,
  seoAssessments: [],
  contentAssessments: [],
};

const reducer = (oldState = initialState, action) => {
  // TODO: Properly compose the reducers.
  const state = {
    ...oldState,
    paper: paperReducer(oldState.paper, action)
  };

  switch (action.type) {
    case UPDATE_KEYWORD:
      return {
        ...state,
        // It's always the current keyword that is updated.
        selectedKeyword: action.payload,
        // Replace the current keyword by the updated version.
        keywords: [
          ...state.keywords.filter(keyword => keyword !== state.selectedKeyword),
          action.payload,
        ],
        analysis:
          Object
            .keys(state.analysis)
            .filter(key => key !== state.selectedKeyword)
            .reduce((result, key) => {
              result[key] = state.analysis[key];
              return result;
            }, {
              [action.payload]: initialAnalysisState,
            }),
      };
    case ASSESS_PAPER:
      // if (typeof state.analysis[action.payload.keyword] === "undefined") {
      //   throw new Error("Paper assessed for uninitialized keyword.");
      // }
      return {
        ...state,
        analysis: {
          ...state.analysis,
          [action.payload.keyword]: {
            // TODO: Add more scores and remove initialAnalysisState.
            ...initialAnalysisState,
            seoScore: action.payload.seoScore,
            seoAssessments: action.payload.seoAssessments,
            contentScore: action.payload.contentScore,
            contentAssessments: action.payload.contentAssessments,
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
