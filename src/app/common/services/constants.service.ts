import { Injectable } from '@angular/core';
import { Attraction } from 'src/models/attraction';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  static attractions: Attraction[] = [
    {
      name: "Kalemegdan",
      likedBy: [
        "student1234",
        "student456"
      ],
      description: "Kalemegdan je najveći beogradski park. Istovremeno je najznačajniji kulturno-istorijski kompleks," 
            + " u kojem dominira Beogradska tvrđava iznad ušća Save u Dunav. Naziv Kalemegdan odnosi se samo na " 
            + "prostorni plato oko tvrđave koji je osamdesetih godina 19. veka pretvoren u park . Plato je, dok " 
            + "je tvrđava bila glavno vojno uporište Beograda, služio da se neprijatelj osmotri i sačeka za borbu." 
            + " Njegovo ime potiče od turskih reči kale („tvrđava“) i mejdan („bojište“). Turci su Kalemegdan nazivali i " 
            + "Fićir-bajir što znači „breg za razmišljanje“",
      images: [
        "../../assets/kalemegdan/1280px-Kalemegdan_3.jpg",
        "../../assets/kalemegdan/1280px-KalemegdanPark.jpg",
        "../../assets/kalemegdan/1280px-Kalemegdanska_tvrđava_IMG_1943.jpg",
        "../../assets/kalemegdan/Monument_of_Gratitude_to_France_in_Belgrade.jpg",
        "../../assets/kalemegdan/Kalemegdanska_tvrđava_2.jpg"
      ]
    },
    {
      name: "Tašmajdan park",
      likedBy: [
        "student1234",
        "student456",
        "ana789",
        "dusan852",
        "milica555"
      ],
      description: "Park Tašmajdan nalazi se između ulica Takovske, Ilije Garašanina, Beogradske i Bulevara " 
              + "kralja Aleksandra na prostoru na kome se nekada nalazio kamenolom, a potom u 19. veku Tašmajdansko" 
              + " groblje. Naziv parka „Tašmajdan“ je nastao od turskog naziva za kamenolom (tur. taş, kamen i " 
              + "meydan, mesto gde se vadi kamen, rudnik). Po jednom starom svedočenju „može se slobodno reći da " 
              + "su u Beogradu sva stara zdanja... ozidana ovim ovde vađenim kamenom“. U katakombama nastalim posle" 
              + " vađenja kamenih blokova, dugo su bila skladišta municije i vojni magacini, a služile su i " 
              + "kao skloništa i zavojišta za ranjene vojnike. Ovde se nalazi Prirodni spomenik Miocenski sprud Tašmajdan.",
      images: [
        "../../assets/tasmajdan/Tašmajdan_Park.jpg",
        "../../assets/tasmajdan/Saint_Mark_church_Belgrade_Tasmajdan.JPG",
        "../../assets/tasmajdan/Ageratum_tagetes_tasmajdan.jpg",
      ]
    }
  ];

  constructor() { }
}
