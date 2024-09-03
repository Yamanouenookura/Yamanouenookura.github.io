$(document).ready(function() {
    // イベントリストの追加
    $('#event-list').append('<li>桜美林高校の文化祭に参加します。<BR>桜美林中学校予想問題、桜美林高校予想問題を配布する予定です。<BR>文化祭2日目に問題の解説を行います。要予約のため、問い合わせフォームからご連絡ください。</li>');


    // ニュースリストの追加
    $('#news-list').append('<li><a href="数学同好会入会試験＿問題用紙.pdf" download="第一回入部試験">第一回入部試験ー問題用紙</a></li>');
    $('#news-list').append('<li><a href="数学同好会入会試験＿解答用紙.pdf" download="第一回入部試験">第一回入部試験ー解答用紙</a></li>');
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
