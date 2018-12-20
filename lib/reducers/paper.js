import { ENTITY_ANALYSIS_START } from "../actions/renderEntity";
import { helpers } from 'yoastseo';

const measureTextWidth = helpers.measureTextWidth;

const initialState = {
  locale: 'en_US',
  // The SEO URL to analyze.
  url: '',
  // A permanent link (e.g. /node/10)
  permalink: '',
  // The title of the entity, can be used for editing.
  entity_label: '',
  // The page title (may contain the site name).
  title: '',
  // The width of the title as calculated by Google.
  titleWidth: '',
  // The short page description used in search results.
  description: '',
  // The full page HTML used for analysis.
  text: '',
};

const paperReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTITY_ANALYSIS_START:
      return {
        ...state,
        url: action.payload.url,
        entity_label: action.payload.entity_label,
        title: action.payload.title,
        titleWidth: measureTextWidth(action.payload.title),
        description: action.payload.description,
        text: action.payload.text,
      };
    default:
      return state;
  }
};

export default paperReducer;