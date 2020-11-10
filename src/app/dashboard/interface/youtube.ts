export interface YouTube {
   date: Date,
   datas: 
      [
         { snippet: { title: String, thumbnails: {default: { url: URL }}}},
         { statistics: { viewCount: Number }}
      ]
};
