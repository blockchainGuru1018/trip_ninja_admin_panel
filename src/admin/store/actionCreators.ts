import * as actionTypes from "./actionTypes";

export function addArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article
  };

  return simulateHttpRequest(action);
}

export function removeArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article
  };
  return simulateHttpRequest(action);
}

export function navType(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.NAV_TYPE,
    article,
  }
  console.log("GGGGG:", article)
  return simulateHttpRequest(action)
}


export function simulateHttpRequest(action: ArticleAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}


