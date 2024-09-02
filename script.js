$(document).ready(function() {
    // イベントリストの追加
    $('#event-list').append('<li>イベント1</li>');
    $('#event-list').append('<li>イベント2</li>');

    // ニュースリストの追加
    $('#news-list').append('<li>ニュース1</li>');
    $('#news-list').append('<li>ニュース2</li>');

    // EmailJSのフォーム送信処理
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // ランダムな番号を生成し、hidden inputにセット
        this.contact_number.value = Math.random() * 100000 | 0;

        // EmailJSのフォーム送信
        emailjs.sendForm('service_z5cygwp', 'template_e6oc0f6', this)
            .then(function() {
                console.log('SUCCESS!');
                alert('お問い合わせが正常に送信されました！');
            }, function(error) {
                console.log('FAILED...', error);
                alert('送信に失敗しました。もう一度お試しください。');
            });
    });
});
