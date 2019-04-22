# ng-extended
extended version of angular cli
1. Sklonować repo 
2. zainstalować package: npm install -g. 
3. run `npm link`
Następnie stworzyć podstawowy projekt angularowy dodać biblioteke primefaces (http://primefaces.org/primeng/#/setup)i można używać naszego package. Np przechodząc do folderu z komponentem "app" wołamy komende nge-add app app sidebar --position=right i dodaje nam sidebar z prawej strony. Dodając nowe rzeczy możecie się wzorować na tym co jest na pliku add.js albo zaproponować coś lepszego. Co do woładnia komendy nge-add to przyjąłem taką konwencje: pierwszy argument to ścieżka do pliku który chemy zmodyfikować, drugi argument to ścieżka do modułu, w którym plik ten jest zadeklarowany (to można usprawnić ale potrzeba algorytmu do przeszukiwania modułów - czyli robota na później), trzeci argument to nazwa elementu, który chcemy dodać (narazie jest tylko sidebar) a kolejne argumenty w formacie "--argument=wartość" to dodatkowe paramatry potrzebne do stylizacji komponentu
