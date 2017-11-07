


import Link from 'next/link'

// Link can use prefetch

// https://github.com/zeit/next.js#prefetching-pages

// <Link href={{ pathname: '/about', query: { name: 'Zeit' }}}

// props: replace prefetch href

// as: https://learnnextjs.com/basics/clean-urls-with-route-masking/route-masking

// as is router masking that show to user, but actual url is the href prop

// but this has some confused thing such as reload dirty router will occur 404 page