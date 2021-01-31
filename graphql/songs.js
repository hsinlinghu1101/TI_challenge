import songs from '../songs.json';
import  MeiliSearch  from 'meilisearch';

const PER_PAGE = 15;
const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' })
const index = client.getIndex('songs')

export default {
  Query: {
    async Songs(root, { page, search }) {
      const offsetStart = PER_PAGE * (page - 1);
      const offsetEnd = offsetStart + PER_PAGE;

      const matchingSongs = search
        ? await index.search(search)
                  .then(res =>{  
                    return  res['hits']
                  })
        : songs;

      return {
        songs: matchingSongs.slice(offsetStart, offsetEnd),
        pageInfo: {
          per_page: PER_PAGE,
          total: matchingSongs.length,
          has_more: offsetEnd < matchingSongs.length,
          current_page: page
        }
      };
    }
  }
};
