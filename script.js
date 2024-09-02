// EmailJSの初期化
(function() {
    emailjs.init("YOUR_USER_ID"); // ここにEmailJSのユーザーIDを入れます
})();

$(document).ready(function() {
    // イベントリストの追加
    const events = [
        { title: "数学コンテスト", date: "2024-09-15" },
        { title: "数学ワークショップ", date: "2024-10-10" },
        { title: "学術講演会", date: "2024-11-05" }
    ];

    events.forEach(event => {
        $("#event-list").append(
            `<li>${event.title} - ${event.date}</li>`
        );
    });

    // ニュースリストの追加
    const news = [
        { title: "新しい研究成果", date: "2024-08-01", content: "数学同好会のメンバーが新しい定理を発見しました。" },
        { title: "数学オリンピアド", date: "2024-07-20", content: "数学オリンピアドで優秀な成績を収めました。" }
    ];

    news.forEach(article => {
        $("#news-list").append(
            `<li><strong>${article.title}</strong> - ${article.date}<br>${article.content}</li>`
        );
    });

    // お問い合わせフォームの送信処理
    $("#contact-form").on("submit", function(event) {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        // フォームデータを取得
        const name = $("#name").val();
        const email = $("#email").val();
        const message = $("#message").val();

        // EmailJSの送信設定
        const serviceID = "service_z5cygwp";
        const templateID = "template_e6oc0f6";

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Emailを送信
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                alert("お問い合わせが送信されました。ありがとうございます！");
                // フォームをリセット
                $("#contact-form")[0].reset();
            }, function(error) {
                alert("送信中にエラーが発生しました。もう一度お試しください。");
            });
    });
});
