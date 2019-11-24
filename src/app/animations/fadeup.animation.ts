import { trigger, transition, style, query, animateChild, group, animate, sequence, stagger } from '@angular/animations';

export const fadeUp =
    trigger('fadeUp', [
        transition('* <=> *', [
            sequence([
                query('.fadeup', [
                    style({
                        opacity: '0.0',
                        transform: 'translate(0px, 20px)'
                    }),
                    stagger(100, [
                        animate('0.4s 0s ease-in', style({
                            opacity: '1',
                            transform: 'translate(0px, 0px)'
                        })),
                    ])
                ], { optional: true }),
            ])
        ]),
    ]);