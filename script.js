$(document).ready(function() {
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

    const news = [
        { title: "新しい研究成果", date: "2024-08-01", content: "数学同好会のメンバーが新しい定理を発見しました。" },
        { title: "数学オリンピアド", date: "2024-07-20", content: "数学オリンピアドで優秀な成績を収めました。" }
    ];

    news.forEach(article => {
        $("#news-list").append(
            `<li><strong>${article.title}</strong> - ${article.date}<br>${article.content}</li>`
        );
    });

    $("#contact-form").on("submit", function(event) {
        event.preventDefault();
        alert("お問い合わせありがとうございます。後ほどご連絡いたします。");
        $(this).trigger("reset");
    });
});
