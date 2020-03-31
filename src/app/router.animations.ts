import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* => home', [
    query(':self',
      [
        style({ opacity: 0 })
      ],
      { optional: true }
    ),

    query(':self',
      [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 }))
      ],
      { optional: true }
    )
  ]),
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({position: 'fixed', width: '100%'})
      , {optional: true}),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
      ], {optional: true}),
    ])
  ])
]);
