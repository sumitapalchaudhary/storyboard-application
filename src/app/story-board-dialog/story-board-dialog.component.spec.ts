import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryBoardDialogComponent } from './story-board-dialog.component';

describe('StoryBoardDialogComponent', () => {
  let component: StoryBoardDialogComponent;
  let fixture: ComponentFixture<StoryBoardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryBoardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
