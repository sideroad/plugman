
export default {
  pages: {
    root: '/:lang',
    plugs: '/:lang/plugs',
    plug: '/:lang/plugs/:plug'
  },
  apis: {
    plugs: '/apis/plugman/plugs',
    plug: '/apis/plugman/plugs/:plug'
  }
};
