import _ from 'lodash';

/**
 * Parses a window.location.hash into a param object
 * @param  {string} hash - The hash section of a URL (eg: '#about?sketch=gravity')
 * @return {string}      - An object with the first hash parameter as 'tab' and the query params as key-value pairs
 */
export const parseHash = (hash) => {
    let params = { tab: '', sketch: '' };
    let pArr = hash.substr(1).split('?');

    params.tab = pArr[0];

    if (pArr[1]) {
        pArr[1].split('&').forEach(q => {
            let [key, val] = q.split('=');
            params[key] = val;
        });
    }

    return params;
}

/**
 * Creates a window hash URL describing the current state
 * @param  {object} params      - An object which may contain 'tab' and 'sketch' string properties
 * @param  {string} currentHash - (Optional) The current window hash
 * @return {string}             - A window hash string (eg: '#about?sketch=gravity')
 */
export const createHash = (params, currentHash) => {
    const newParams = parseHash(currentHash);
    _.merge(newParams, params);

    let hash = '' + newParams.tab;
    if (newParams.sketch) {
        hash += '?sketch=' + newParams.sketch;
    }

    return hash;
}
