$(document).ready(() => {

  const $renderUserInfo = user => {
    const $userInfo =
    `<div id="name">Hello ${user.name}</div>`;

    $(".user_info").append($userInfo);
  };

  const loadUserInfo = () => {
    // getting user id from url
    const userId = Number($(location).attr('pathname').substring(7));

    $.ajax({
      url: `/users/${userId}/info`,
      method: "GET",
      dataType: "json"
    })
      .then(data => $renderUserInfo(data));
  };
  loadUserInfo();
});
