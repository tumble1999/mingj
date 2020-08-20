#ifndef _DEV_MAJOR_H
#define _DEV_MAJOR_H

/*
 * This file has definitions for major device numbers
 */

/* limits */

#define MAX_CHRDEV 32
#define MAX_BLKDEV 32

/*
 * assignments
 *
 * devices are as follows:
 *
 *      character              block                  comments
 *      --------------------   --------------------   --------------------
 *  0 - unnamed                unnamed                minor 0 = true nodev
 *  1 - /dev/mem               ramdisk
 *  2 - 
 *  3 -                        localstorage
 *  4 - /dev/tty*
 *  5 - /dev/tty; /dev/cua*
 *  6 - 
 *  7 - 
 *  8 - 
 *  9 - 
 * 10 - mice
 * 11 - 
 * 12 - 
 * 13 - 
 * 14 - sound
 * 15 - 
 * 16 - websockets
 * 17 - 
 * 18 - 
 * 19 - 
 * 20 - 
 * 21 - 
 * 22 - 
 * 23 -
 * 24 -
 * 25 -
 * 26 -
 * 27 -
 */

#define UNNAMED_MAJOR	0
#define MEM_MAJOR	1
/* unused: 2 */
#define WS_MAJOR	3
#define TTY_MAJOR	4
#define TTYAUX_MAJOR	5
/* unused: 6,7,8,9 */
#define MOUSE_MAJOR	10
/* unused: 11,12,13 */
#define SOUND_MAJOR	14
/* unused: 15 */
#define WEBSOCKET_MAJOR	16
/* unused: 17,18, 19, 20,21,22,23, 24, 25, 27 */

#endif //!_DEV_MAJOR_H