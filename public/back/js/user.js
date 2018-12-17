$(function() {
  var currentPage = 1 //当前页
  var pageSize = 5 // 每页5条
  var currentId //当前修改的用户id
  var isDelete //当前修改状态

  render()

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        // template('模板id'，数据对象)
        var htmlStr = template('tpl', info)
        $('tbody').html(htmlStr)

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function(a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page
            render()
          }
        })
      }
    })
  }

  //   给所有按钮添加点击事件 通过事件委托注册
  $('tbody').on('click', '.btn', function() {
    // 点击显示模态框
    $('#userModal').modal('show')
    // 获取储存id
    currentId = $(this)
      .parent()
      .data('id')
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1
  })
  $('#submitBtn').click(function() {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function(info) {
        if (info.success) {
          $('#userModal').modal('hide')
          render()
        }
      }
    })
  })
})
