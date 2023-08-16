import {api} from '../api'

// 帖子查询
export const forumPage = params => {
    return api.get('/forum/post/v1/page', {params: params}).then(response => response)
};