import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-story-board-dialog',
  templateUrl: './story-board-dialog.component.html',
  styleUrls: ['./story-board-dialog.component.scss']
})
export class StoryBoardDialogComponent implements OnInit {
  item: string;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.item = data.item;
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
