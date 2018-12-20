const ENTITY_RENDER_START = 'ENTITY_RENDER_START';
const ENTITY_ANALYSIS_START = 'ENTITY_ANALYSIS_START';

function renderEntity() {
  return {
    type: ENTITY_RENDER_START,
  }
}

function analyseEntity(data) {
  return {
    type: ENTITY_ANALYSIS_START,
    payload: data,
  }
}

export {
  ENTITY_RENDER_START,
  ENTITY_ANALYSIS_START,
  renderEntity,
  analyseEntity
}
