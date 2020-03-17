export default [
  {
    url: '/permission/buttons',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          buttons: ['add', 'delete', 'edit']
        }
      }
    }
  }
]
