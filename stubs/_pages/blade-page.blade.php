<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>Blade page with HTML support</h1>
    <div id="php">
        @php
            echo "Can run arbitrary PHP";    

            $array = [
                'key' => 'value',
                'key2' => 'value2'
            ];
        @endphp
    </div>
    <div id="foreach">
        @foreach ($array as $key => $value)
            Foreach loops and echo: {{ $key }} => {{ $value }}
        @endforeach
    </div>
</body>
</html>