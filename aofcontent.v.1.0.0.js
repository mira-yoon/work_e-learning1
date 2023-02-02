var _fileinfo_ = {
	version : "4.1.1"
};
var CMI = null; // cmi API
/**
* cmi API 찾기
*/
function getCMI() {
	var _parent = parent;
	var _loop=1;
		while(!CMI && _loop==1) {
		CMI = _parent.CMI;
			_loop=0;
		if(_parent != top){
			_parent = _parent.parent;
			_loop=1;
			}
		}
	}
/**
 * 전체페이지 수
 */
function _setTotalPage(count) {
    getCMI();
    if (CMI != null) {
        CMI.doSetObjectives(count);
    }
}
/**
 * 현재 페이지 
 */
function _setPage(page, location) {
    if (CMI != null && !isNaN(page)) {
        CMI.doSetObjectivesComplete(page);
        if (typeof location === "string" && location.length > 0) {
            var href = self.location.href;
            var path = href.substring(0, href.lastIndexOf("/"));
            CMI.doSetValue("cmi.location", location.replace(path, "."));
        }
    }
}
/**
 * 마지막 학습 페이지
 */
function _getLocation() {
    if (CMI != null) {
        return CMI.doGetValue("cmi.location", "");
    }else{
        return "";
    }
}
/**
 * 접근한 페이지정보  세팅 
 */
function _setLoadPage(loagPage) {
    if (CMI != null) {
        return CMI.doSetValue("cmi.loadpage", loagPage);
    }else{
        return "";
    }
}


/**
 * 접근한 페이지정보 가져오기
 */
function _getLoadPage() {
    if (CMI != null) {
        return CMI.doGetValue("cmi.loadpage", "");
    }else{
        return "";
    }
}
