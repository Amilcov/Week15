import Cookies from 'js-cookie';

export async function csrfFetch (url, options = {}) {
console.log('_____csrfFETCH');

    options.method = options.method || 'GET';
    options.headers = options.headers || {};

  
    if (options.method.toUpperCase() !== 'GET') {
        console.log('differite de Get');
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    }    

    console.log('options', options);
    const response = await window.fetch(url, options);
    if (response.status >= 400) throw response;

    return response;
};

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}

