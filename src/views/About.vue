<template>
<b-container>
  <b-row>
    <div class="col-sm-6 col-md-8 col-lg-9">
      <h1>Over deze applicatie</h1>
      <p>
        Deze applicatie is gemaakt in het kader van het vak 'Clientside web frameworks' van Avans Hogeschool
        Breda.
      </p>
      <h3></h3>
      <p>
        Dit project is een gebaseert op het idee van een Imageboard: "Een imageboard is een soort internetforum
        dat draait om het plaatsen van afbeeldingen, vaak naast gerelateerde tekst en discussie" - wikipedia
        Een Board gaat over een centraal onderwerp bijv: games, films, muziek, etc.
        Een board bevat threads met een onderwerp die hoort bij het bord.
        Gebruikers kunnen een thread starten met een onderwerp. Deze thread bevat posts van andere gebruikers.
        Gebruikers kunnen op elkaars post binnen een thread reageren. Als er na een bepaalde tijd niet gereageert is in een thread wordt deze verwijdert.
      </p>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <div class="d-flex justify-content-center align-items-center">
          <img
                  src="src/assets/logo.png"
                  class="card-img-top rounded-circle border profile-pic"
                  alt="..."
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Pieter Mourik</h5>
          <p class="card-text">
            Studentnummer: 2144283
          </p>
        </div>
      </div>
    </div>
  </b-row>

  <h3>Entiteiten</h3>
  <b-row>
    <!--  <div *ngFor="let ENTITIES of entities">-->
    <!--    <app-entities [entities]="ENTITIES"></app-entities>-->
    <!--  </div>-->
    <div class="col-sm-12 col-md-4">
      <p>Entiteit: User</p>
      <ul>
        <li>id: string</li>
        <li>naam: string</li>
        <li>email: string</li>
        <li>password: string</li>
        <li>role: string</li>
        <li>gender: string</li>
        <li>dateOfBirth: date</li>
        <li>Status: int</li>
      </ul>
    </div>
    <div class="col-sm-12 col-md-4">
      <p>Entiteit: Board</p>
      <ul>
        <li>id: string</li>
        <li>naam: string</li>
        <li>Creator: string</li>
        <li>threads: [threads]</li>
        <li>Status: int</li>
      </ul>
    </div>
    <div class="col-sm-12 col-md-4">
      <p>Entiteit: Thread</p>
      <ul>
        <li>id: string</li>
        <li>title: string</li>
        <li>text: string</li>
        <li>image: File</li>
        <li>creationDate: datetime</li>
        <li>Status: int</li>
        <li>comment: [comments]</li>
      </ul>
    </div>
    <div class="col-sm-12 col-md-4">
      <p>Entiteit: Post</p>
      <ul>
        <li>id: string</li>
        <li>text: string</li>
        <li>creationDate: datetime</li>
        <li>Status: int</li>
        <li>replies: [comments]</li>
      </ul>
    </div>
  </b-row>

  <b-row>
    <div class="col-12">
      <h3>Use Cases</h3>
      <p>De applicatie biedt de volgende functionaliteit.</p>
<!--      <div *ngFor="let UC of useCases">-->
<!--        <app-usecase [useCase]="UC"></app-usecase>-->
<!--      </div>-->
    </div>
  </b-row>

</b-container>
</template>
