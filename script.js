$(document).ready(function() {
    // イベントリストの追加
    $('#event-list').append('<li>【重要】再三のご報告になりますが私たちは非公認の有志団体です。</li>');
    $('#event-list').append('<li>桜美林学園での文化祭1日目に中学、高校入試予想問題計48部すべて配布完了いたしました。<br>ご来場いただいた皆様に感謝いたします。<br>こちらの問題は数学同好会が過去の問題の傾向を調査して作成した問題ですので、<b>実際の入試問題とは一切関係ありません。<b><br>中学入試問題の問題にいくつか、間違いがありましたので後日こちらのホームページで解答を配信する際に訂正した問題を配信する予定です。<br>そのため、2日目の問題配布は高校入試のみとさせていただきます。<br>誠に申し訳ございません。</li>');


    // ニュースリストの追加
    //$('#news-list').append('<li><a href="桜美林高校_模試.pdf" download="桜美林高校_模試">桜美林高校_模試</a></li>');
    //$('#news-list').append('<li><a href="桜美林高校_模試_解答用紙.pdf" download="桜美林高校_模試_解答用紙">桜美林高校_模試_解答用紙</a></li>');
    //$('#news-list').append('<li><a href="桜美林中学校_模試.pdf" download="桜美林高校_模試">桜美林中学校_模試</a></li>');
    //$('#news-list').append('<li><a href="桜美林中学_模試_解答用紙.pdf" download="桜美林中学_模試_解答用紙">桜美林中学_模試_解答用紙</a></li>');


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
