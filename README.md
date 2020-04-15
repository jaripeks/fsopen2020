# fsopen2020
Fullstack Open 2020 tehtävät

## Repositorion rakenne
Jos palautat eri osien tehtäviä samaan repositorioon, käytä järkevää hakemistojen nimentää. Voit toki tehdä jokaisen osan omaankin repositorioon, kaikki käy. Jos käytät privaattirepositoriota tehtävien palautukseen, liitä repositoriolle collaboratoriksi mluukkai

Eräs varsin toimiva hakemistorakenne palautusrepositoriolle on tässä esimerkkirepositoriossa käytetty tapa, jossa kutakin kutakin osaa kohti on oma hakemistonsa, joka vielä jakautuu tehtäväsarjat (kuten osan 1 unicafe) sisältäviin hakemistoihin:
```
osa0
osa1
  kurssitiedot
  unicafe
  anekdootit
osa2
  puhelinluettelo
  maiden_tiedot
```
Hakemistoon kannattaa sijoittaa koko tehtäväsarjan react-projekti lukuunottamatta riippuvuuksia sisältävää hakemistoa node_modules

Vinkki: Kun olet avaamassa tehtävääsi Visual Studio Codella, huomaathan avata koko projektin kansion editoriin. Tämä mahdollistaa editorissa helpomman tiedostojen välillä siirtymisen ja paremmat automaattiset täydennykset. Saat tämän tehtyä siirtymällä terminaalissa projektin kansioon ja suorittamalla komennon:

``` $ code . ```

VAROITUS create-react-app tekee projektista automaattisesti git-repositorion, ellei sovellusta luoda jo olemassaolevan repositorion sisälle. Todennäköisesti et halua että projektista tulee repositorio, joten suorita projektin juuressa komento

``` rm -rf .git ```