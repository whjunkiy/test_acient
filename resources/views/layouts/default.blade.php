<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="{{ app()->getLocale() }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>@yield('title')</title>
    <link href="/css/layout.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>
    <link href="/css/jquery.autocomplete.css" type="text/css" rel="stylesheet"/>
    <link href="/scripts/SpryAssets/SpryValidationTextField.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossorigin="anonymous">
    <script src="/scripts/jquery.js" type="text/javascript">
    </script>
    <script src="https://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <script src="/scripts/jquery.autocomplete.js" type="text/javascript">
    </script>
    <script src="/scripts/base.js" type="text/javascript">
    </script>
    <script src="/scripts/SpryAssets/SpryValidationTextField.js" type="text/javascript">
    </script>
    <script src="/scripts/jquery.tablesorter.min.js" type="text/javascript"></script>
    <script>
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    </script>
    <style>
        .mofoNav{
            margin: 1rem;
        }
        .cityul li{
            margin: 1rem;
            cursor: pointer;
        }
        .mofoNav li{
            display: inline;
        }
    </style>
</head>

<body id="app">
<div>
    <ul class="mofoNav">
        <li><a href="/">Главная</a></li>
        <li><a href="/about" id="about_link">О нас</a></li>
        <li><a href="/news" id="news_link">Новости</a></li>
    </ul>
</div>
@yield('content')
<script>
    let name = "curCity";
    let value = getCookie(name) ?? '';

    if (value) {
        let curCity = $("li[data-slug='" + value +"']");
        if (curCity) {
            curCity.css('font-weight', 'bolder');
            $("#cur_city").text(curCity.text());
            $('#about_link').attr('href', value+'/about');
            $('#news_link').attr('href', value+'/news');
        }
    }

    $('.cityul li').click(function() {
        value = $(this).data('slug');
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        location.href = '/'+value;
    });
</script>
</body>
</html>