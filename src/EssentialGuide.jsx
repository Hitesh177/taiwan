import { Link, useParams } from 'react-router-dom'
import './Essentials.css'

const affiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341017&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F132311-esim-taiwan-with-high-speed-and-stable-internet-connection%2F'
const hsrAffiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341032&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F73749-thsr-one-way-ticket-taipei%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Deecfc60c48'
const easyCardAffiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341131&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F5777-public-transport-easycard-taipei%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D99bb198292'
const metroPassAffiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341132&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F91567-taipei-metro-day-pass%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D5e5b7c214e'
const touristShuttleAffiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341133&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F103194-taiwan-touristt-shuttle%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Dc8be49f516'
const taichungBusAffiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341138&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F113285-taoyuan-airport-taichung-bus-by-ubus%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D77ad67f212'
const airportTransferAffiliateLink = 'https://affiliate.klook.com/redirect?aid=127568&aff_adid=1341139&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F38236-shared-taiwan-taoyuan-international-airport-transfers-taipei%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D62c8c812b2'
const kkdayTransferAffiliateLink = 'https://www.kkday.com/en-sg/product/1781-airport-pickup-drop-off-taiwan-taoyuan-international-airport-taipei-new-taipei-city-taiwan?cid=25946&ud1=AIRPORTTRANSFER'
const welcomePickupsAffiliateLink = 'https://tp.media/r?marker=742039&trs=542021&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627'

const guideContent = {
  'sim-cards': {
    title: 'SIM Cards & Internet in Taiwan',
    subtitle: 'How to get online in Taiwan without selling a kidney or fighting aunties at the airport counter.',
    seo: 'Taiwan SIM card for tourists, Taiwan eSIM, best prepaid SIM Taiwan, Chunghwa Telecom tourist SIM, Taiwan mobile data for travelers, how to get internet in Taiwan, Taiwan airport SIM card, Taiwan eSIM vs physical SIM',
    sections: [
      {
        type: 'intro',
        content: `Let us address the elephant in the room. Yes, Taiwan has internet. No, you will not be stranded in a mountain village with nothing but a paper map and your thoughts. The mobile coverage here is genuinely excellent -- 4G reaches places that have no business having 4G, like the middle of Taroko Gorge or that random tea house in the Alishan mist.

        But here is the thing. Walk into the airport arrivals hall without a plan, and you will find yourself staring at three competing telecom counters, each staffed by a very nice person speaking rapid Mandarin, while you stand there wondering if you just signed up for a 5-year contract or a 30-day plan.

        Let us fix that before you land.`
      },
      {
        type: 'h2',
        title: 'Option 1: eSIM (The Lazy Way, Also the Smart Way)'
      },
      {
        type: 'p',
        content: `If your phone was made in the last three years, it probably supports eSIM. This is the cheat code of Taiwan internet. You buy it online before your flight, scan a QR code, and boom -- you have data the moment you land. No hunting for a SIM card slot tool. No trying to keep your tiny physical SIM safe. No airport counter negotiations.

        The Klook eSIM runs on Chunghwa Telecom, which is basically Taiwan's version of Verizon -- the most reliable network on the island. It is high-speed, stable, and works everywhere from Taipei 101's observation deck to that random convenience store in the middle of nowhere.`
      },
      {
        type: 'affiliate',
        text: 'Grab the Klook Taiwan eSIM here',
        note: 'High-speed, Chunghwa network, activates instantly. No queuing required.'
      },
      {
        type: 'h2',
        title: 'Option 2: Airport Pickup SIM (The Classic Tourist Move)'
      },
      {
        type: 'p',
        content: `Landing at Taoyuan Airport? Walk past baggage claim toward the arrivals hall and you will see three counters lined up like a telecom gauntlet: Chunghwa Telecom, Taiwan Mobile, and FarEasTone.

        Here is the deal. All three offer similar tourist SIMs. A 7-day unlimited data plan will cost you around NT$500 (roughly US$15-16). A 15-day plan runs about NT$800-900. These are physical SIMs that go into your phone. They include a local Taiwanese number, which you will use exactly once -- probably to order food delivery.

        The gentle warning: these counters can get busy. If your flight lands at peak hour (think: any arriving flight from Tokyo, Hong Kong, or Singapore), expect a 15-25 minute wait. You have been warned.`
      },
      {
        type: 'h2',
        title: 'Option 3: Pre-Order Airport Pickup (The Middle Path)'
      },
      {
        type: 'p',
        content: `Here is a secret the airport counters do not advertise. You can pre-order your SIM online through Klook or KKDay, pick it up at a dedicated counter, and save 20-30% compared to buying it at the airport. The line is also shorter because nobody knows about this hack.

        You select your plan, pay online, and show a QR code at the airport. They hand you the SIM. You insert it. You are online. The whole thing takes two minutes.`
      },
      {
        type: 'h2',
        title: 'Option 4: Convenience Store SIM (For the Chaos Goblins)'
      },
      {
        type: 'p',
        content: `Did you land and immediately forget to get a SIM? Did you walk past the counters and only realize it when you tried to open Google Maps? Relax. Walk into any 7-Eleven or FamilyMart.

        They sell prepaid SIM cards from Taiwan Mobile and FarEasTone. The catch: the staff may or may not speak English, and activation requires you to follow a set of instructions that range from "surprisingly simple" to "why is this in Chinese only." It works, but it is the least convenient option. Save it for emergencies.`
      },
      {
        type: 'h2',
        title: 'Pocket WiFi (The Retro Choice)'
      },
      {
        type: 'p',
        content: `Pocket WiFi exists. You can rent a little device that creates a WiFi hotspot for your phone, your partner's phone, your backup phone, and maybe a small village. It costs about NT$150-200 per day.

        But honestly? In 2025, carrying a separate device that needs charging, has to be returned at the airport, and adds weight to your bag feels a bit like bringing a DVD player on a plane. Get an eSIM. Your future self will thank you.`
      },
      {
        type: 'h2',
        title: 'Taiwan Mobile Networks: The Quick Rundown'
      },
      {
        type: 'p',
        content: `Three major players dominate Taiwan's mobile scene. Here is who they are and what you need to know:`
      },
      {
        type: 'list',
        items: [
          'Chunghwa Telecom (CHT) -- The biggest and most reliable. Best coverage in mountains and rural areas. If you are hiking, this is your safest bet. The Klook eSIM runs on this network.',
          'Taiwan Mobile -- Solid coverage in cities, slightly weaker in remote areas. Their tourist SIM is competitively priced.',
          'FarEasTone (FET) -- Good coverage overall. Their plans are similar to Taiwan Mobile. Pick whichever counter has the shortest line at the airport.'
        ]
      },
      {
        type: 'h2',
        title: 'How Much Data Do You Actually Need?'
      },
      {
        type: 'p',
        content: `Be honest with yourself. You are going to use Google Maps constantly (because Taiwan's alleys make zero sense), upload approximately 47 photos of food to Instagram, scroll TikTok during MRT rides, and Google "what is this temple" at least 15 times.

        A 7-day unlimited plan for NT$500 is enough for most people. If you are staying longer, get the 15-day plan. You will not regret the extra data. The only thing worse than running out of data in Taiwan is trying to find WiFi in a night market.`
      },
      {
        type: 'h2',
        title: 'The EasyCard of SIM Cards: Our Recommendation'
      },
      {
        type: 'p',
        content: `If you want the simplest, most reliable, and most affordable option with zero airport hassle: get the Klook eSIM before you fly. You pay online, scan a QR code, and you are connected on Chunghwa Telecom's network the moment you step off the plane. No queue, no language barrier, no paperwork.`
      },
      {
        type: 'affiliate',
        text: 'Get the Taiwan eSIM here',
        note: 'High-speed internet on Chunghwa network. Instant activation. No airport queue required.'
      },
      {
        type: 'h2',
        title: 'Frequently Avoided Questions'
      },
      {
        type: 'qna',
        q: 'Does my phone need to be unlocked?',
        a: 'Yes. If your phone is carrier-locked in your home country, a Taiwanese SIM will not work. Check with your carrier before you travel.'
      },
      {
        type: 'qna',
        q: 'Will I keep my home number?',
        a: 'With a physical SIM or eSIM, you will have a Taiwanese number. Your home number will not work unless you have a dual-SIM phone and keep your home SIM active. WhatsApp and Telegram will still work with your usual number as long as you have data.'
      },
      {
        type: 'qna',
        q: 'Can I use a Taiwanese SIM in other countries?',
        a: 'No. These are Taiwan-only data plans. If you are hopping to Japan or Korea after, you will need a separate SIM for each country.'
      },
      {
        type: 'qna',
        q: 'Is WiFi widely available in Taiwan?',
        a: 'Yes, but do not rely on it. Most hotels and cafés have free WiFi, but public WiFi spots (iTaiwan) require registration and are slower than mobile data. Having your own SIM is the difference between "let me find a café with WiFi" and "let me look up where to go right now."'
      },
      {
        type: 'h2',
        title: 'The Bottom Line'
      },
      {
        type: 'p',
        content: `Getting internet in Taiwan is easy. Getting it without overpaying or wasting time at the airport requires a tiny bit of planning. Buy an eSIM online before you leave. Land, turn on your phone, and you are connected. It is the closest thing to travel magic that does not involve a temple or a night market.`
      }
    ]
  },

  'airport-to-city': {
    title: 'Airport to City: Getting from Taoyuan Airport to Taipei',
    subtitle: 'MRT, bus, taxi, or private car -- there is a right option for every arrival and every budget.',
    seo: 'Taoyuan Airport to Taipei, TPE to Taipei transport, airport MRT Taiwan, Taoyuan Airport bus, airport to Taipei station, Taiwan airport transfer, Taoyuan Airport taxi',
    sections: [
      {
        type: 'intro',
        content: `You have stepped off the plane at Taoyuan International Airport (TPE), cleared immigration, and grabbed your bags. Now comes the question every traveler faces: what is the best way to get from here to the city?

        Taiwan has a well-connected transport network that makes the journey straightforward. The choice depends on where you are staying, how much luggage you have, what time you arrive, and whether you prefer speed, budget, or convenience. Here is a breakdown of every option.`
      },
      {
        type: 'h2',
        title: 'Airport MRT (The Most Popular Choice)'
      },
      {
        type: 'p',
        content: `The Taoyuan Airport MRT is the go-to option for most travelers heading into Taipei. It is reliable, runs frequently, and connects directly to Taipei Main Station. From either terminal, follow the purple signs toward the MRT station. It is hard to miss.`
      },
      {
        type: 'h3',
        title: 'Express Train vs Commuter Train'
      },
      {
        type: 'p',
        content: `The MRT system operates two types of services. The Express train skips most intermediate stations and reaches Taipei Main Station in about 35 minutes. The Commuter train stops at every station along the way and takes around 50 minutes. The fare is the same for both -- NT$160 one-way -- so the Express is the better option unless you are heading to a station that only the Commuter serves.`
      },
      {
        type: 'h3',
        title: 'Operating Hours and Payment'
      },
      {
        type: 'p',
        content: `Trains run from approximately 6:00 AM to 11:30 PM. During peak hours, they come every 15 minutes or so. Off-peak, expect a 20-30 minute wait. You can buy tickets at the station vending machines, which accept NT$100, NT$500, and NT$1,000 bills. If you have an EasyCard, you can tap it directly at the gate -- no ticket needed. The MRT also has dedicated luggage racks on board, so you do not have to wrestle your suitcase in the aisle.`
      },
      {
        type: 'p',
        content: `One limitation: the MRT stops running around midnight. If your flight lands late, you will need to take a bus or taxi instead.`
      },
      {
        type: 'h2',
        title: 'The EasyCard: Your Key to Everything'
      },
      {
        type: 'p',
        content: `If you take only one piece of advice from this guide, let it be this: get an EasyCard. It is a reloadable smart card that works on the MRT, buses, most taxis, convenience stores, vending machines, and even some night market stalls. Think of it as Taiwan's version of London's Oyster card or Hong Kong's Octopus card -- except cuter and with more pandas on it.`
      },
      {
        type: 'p',
        content: `You can buy an EasyCard at any MRT station ticket machine or convenience store. The standard card costs NT$100 (refundable deposit) and you load it with cash. No registration, no paperwork, no forms. Tap it at the gate, the fare is deducted automatically. It is the closest thing to frictionless public transport.`
      },
      {
        type: 'h3',
        title: 'Limited Edition Cards: The Collector\'s Trap (and We Are Here for It)'
      },
      {
        type: 'p',
        content: `Here is where things get dangerous for your wallet. Taiwan regularly releases limited edition EasyCards featuring everything from Hello Kitty to National Palace Museum artifacts to local street food. There is a card with a bouncing cartoon onion. There is one shaped like a hot dog. There is a card that plays a sound when you tap it. Yes, really.`

      },
      {
        type: 'p',
        content: `These limited edition cards do not cost much more than the standard one -- usually NT$100-200 for the card itself -- but they are infinitely more fun to pull out of your pocket at an MRT gate. The catch: they sell out fast and are often only available at specific stations or convenience stores. If you spot one you like, grab it immediately. You might not see it again. (Speaking from experience. I am still mourning the bubble tea card I passed on in 2023.)`
      },
      {
        type: 'affiliate',
        text: 'Get your EasyCard before you land',
        note: 'Skip the queue at the MRT station. Pre-order your EasyCard on Klook and pick it up at the airport or have it delivered to your hotel.',
        link: easyCardAffiliateLink
      },
      {
        type: 'h2',
        title: 'Taipei Metro Day Pass: Unlimited Rides, Zero Thinking'
      },
      {
        type: 'p',
        content: `Here is a hot take: the EasyCard is great, but if you are planning to spend a full day hopping around Taipei -- from a morning at Chiang Kai-shek Memorial Hall to an afternoon in Beitou's hot springs to an evening at Shilin Night Market -- the Taipei Metro Day Pass will save you money and brain cells. One pass, unlimited MRT rides, no math required.`
      },
      {
        type: 'p',
        content: `You can choose from 1-day, 24-hour, 48-hour, or 72-hour passes depending on how aggressively you plan to explore. Pick it up at any MRT station or at the airport when you arrive. Tap it at the gate and go. No reloading, no checking your balance, no standing at the ticket machine like a lost tourist wondering which button does what.`
      },
      {
        type: 'affiliate',
        text: 'Grab your Taipei Metro Day Pass',
        note: 'Explore with ease. Skip the queue, save time, and ride unlimited across Taipei. Available for pickup at MRT stations or TPE Airport.',
        link: metroPassAffiliateLink,
        cta: 'Buy Now, Ride Like a VIP'
      },
      {
        type: 'h2',
        title: 'Airport Buses (Cheaper, More Options, 24-Hour Service)'
      },
      {
        type: 'p',
        content: `Buses are slightly cheaper than the MRT and serve more destinations across Taipei. The bus pickup areas are on the first floor of both terminals. The three main routes are:`
      },
      {
        type: 'list',
        items: [
          'Bus 1819 (Kuo-Kuang Motor Transportation) -- NT$135 one-way, 55-70 minutes. Terminates at Taipei Main Station (East Gate 3). This is the most well-known airport bus route and runs 24 hours a day, making it the only option for late-night arrivals. Buses run every 15-30 minutes during the day and every 30-60 minutes late at night.',
          'Bus 1960 (UBus / CitiAir Bus) -- NT$200 one-way, 45-70 minutes. Serves the Xinyi business district and Taipei 101 area. Major stops include Nanjing Fuxing MRT Station and Taipei City Hall Bus Station. Ideal if you are staying in the eastern part of the city.',
          'Bus 1961 (UBus / CitiAir Bus) -- NT$105-200 one-way depending on your stop, 60-90 minutes. Heads toward the Ximending area. Add 20-30 minutes of buffer time during weekends and peak hours because traffic in western Taipei can get heavy.'
        ]
      },
      {
        type: 'p',
        content: `Each bus has a luggage compartment underneath, so you do not have to haul your suitcase onto the seat. The main downside: buses get stuck in traffic, especially during weekday rush hours (8-10 AM and 5-7 PM). If you are arriving during those windows, the MRT is a faster bet.`
      },
      {
        type: 'affiliate',
        text: 'Shared Airport Transfer: Taoyuan Airport to Taipei',
        note: 'Order via the app and receive your voucher to board immediately -- no paper ticket needed. Takes just 70 minutes and serves Ximending, Taipei Main Station, Xinyi District, Xindian, and Banqiao.',
        link: airportTransferAffiliateLink,
        cta: 'Book Your Airport Transfer'
      },
      {
        type: 'h2',
        title: 'Taxi (The Door-to-Door Option)'
      },
      {
        type: 'p',
        content: `Official taxis queue up at the taxi stands outside the arrivals hall in both terminals. A metered ride to central Taipei costs between NT$1,000 and NT$1,500, depending on traffic and your exact destination. The trip takes about 40 to 60 minutes.`
      },
      {
        type: 'p',
        content: `Taxis are worth considering if you are arriving after the MRT stops running, carrying heavy luggage, or traveling in a group of three or four where the cost per person becomes reasonable. The queue at the taxi stand is managed by a dispatcher who can help make sure you get to the right cab.`
      },
      {
        type: 'p',
        content: `A practical note: ask the driver if they accept credit cards before getting in. While many taxis in Taipei now have card terminals, cash is still more common. Having some Taiwanese dollars on hand will save you from an awkward moment at the destination.`
      },
      {
        type: 'h2',
        title: 'Private Transfer and Ride-Hailing Apps'
      },
      {
        type: 'p',
        content: `Private transfer services from providers like Klook, KKDay, and the local Taiwan Taxi 55688 app allow you to book a car in advance. The driver meets you at the arrivals hall with a sign, helps with your luggage, and takes you directly to your hotel. Prices are higher than a metered taxi -- typically NT$1,500 to NT$2,500 -- but the convenience of having everything arranged before you land is hard to beat.`
      },
      {
        type: 'p',
        content: `Uber is available at the airport and can be booked through the app. The pickup point is at the same area as the taxi stand. Prices are generally similar to or slightly above metered taxi rates, with the advantage of knowing the fare upfront.`
      },
      {
        type: 'affiliate',
        text: 'KKDay Private Airport Transfer: Taoyuan Airport to Taipei',
        note: 'Pre-book your private car on KKDay. The driver meets you at arrivals with a sign, helps with luggage, and takes you directly to your hotel in Taipei or New Taipei City. No waiting, no hassle.',
        link: kkdayTransferAffiliateLink,
        cta: 'Book Your Private Transfer'
      },
      {
        type: 'affiliate',
        text: 'Welcome Pickups: Airport Transfer with a Smile',
        note: 'Pre-book your Welcome Pickups driver for a stress-free arrival. Your driver will be waiting at the arrivals hall, ready to help with luggage and take you straight to your accommodation.',
        link: welcomePickupsAffiliateLink,
        cta: 'Book Your Welcome Pickups Ride'
      },
      {
        type: 'h2',
        title: 'Getting to Other Cities from the Airport'
      },
      {
        type: 'p',
        content: `If Taipei is not your final stop, here is how to continue your journey from the airport:`
      },
      {
        type: 'h3',
        title: 'Taichung'
      },
      {
        type: 'p',
        content: `Tonglian Bus Route 1623 runs directly from Taoyuan Airport to Taichung Station. The fare is about NT$300 and the trip takes roughly 2 hours. Alternatively, take the Airport MRT one stop to Taoyuan HSR Station and catch the High Speed Rail to Taichung -- the HSR takes about 40 minutes and costs around NT$700.`
      },
      {
        type: 'affiliate',
        text: 'UBus: Taoyuan Airport to Taichung Direct',
        note: 'Redeem your voucher and board immediately with Klook -- no need to exchange for paper tickets. The fastest trip from Taoyuan Airport to Taichung is only 2 hours 20 minutes. Stops include Terminal 1, Terminal 2, Taipei City Hall MRT Station, and Taichung Station.',
        link: taichungBusAffiliateLink,
        cta: 'Book Your Airport-to-Taichung Bus'
      },
      {
        type: 'affiliate',
        text: 'PSST -- want BOGO or 15% off your HSR tickets?',
        note: 'Book through Klook with promo code G02TAIWAN for buy-one-get-one or 15% off selected HSR packages. Pre-sale up to 180 days in advance. You also get freebies: Starbucks B1G1, Tiger Sugar 10% off, and more.',
        link: hsrAffiliateLink
      },
      {
        type: 'h3',
        title: 'Kaohsiung and Tainan'
      },
      {
        type: 'p',
        content: `Take the Airport MRT to Taoyuan HSR Station, then board the HSR heading south. The ride to Kaohsiung (Zuoying Station) takes about 90 minutes and costs roughly NT$1,400. For Tainan, the HSR takes about 75 minutes from Taoyuan.`
      },
      {
        type: 'h3',
        title: 'Hualien and the East Coast'
      },
      {
        type: 'p',
        content: `There are no direct buses from the airport to Hualien. The most straightforward route is to take the Airport MRT to Taipei Main Station, then transfer to a TRA train heading east. The TRA ride to Hualien takes 2 to 3 hours depending on the train type.`
      },
      {
        type: 'h2',
        title: 'Taiwan Tourist Shuttle: Hop-On, Hop-Off, Explore More'
      },
      {
        type: 'p',
        content: `If your itinerary involves more than one city -- say, Taipei to Taroko Gorge to Sun Moon Lake to Kaohsiung -- the Taiwan Tourist Shuttle is worth knowing about. It is a bus network designed specifically for tourists, connecting major sightseeing spots across the island. Think of it as a hop-on-hop-off service but for the whole country, not just one city.`
      },
      {
        type: 'p',
        content: `The shuttle covers routes that public buses sometimes skip: up the winding roads to Alishan, along the stunning east coast near Hualien, and into the mountain towns of Nantou. The buses are clean, air-conditioned, and run on schedules that actually make sense for tourists (unlike the local bus, which may run three times a day and somehow always at lunchtime).`
      },
      {
        type: 'p',
        content: `You can book passes for specific routes or get a multi-day pass that covers the whole network. It is especially useful for reaching places that are awkward to get to by train, like the Taroko Gorge trailheads, Sun Moon Lake, or the old streets of Jiufen and Shifen.`
      },
      {
        type: 'affiliate',
        text: 'Book the Taiwan Tourist Shuttle',
        note: 'Hop-on-hop-off bus network connecting Taiwan\'s top sightseeing spots. Convenient, affordable, and runs on tourist-friendly schedules.',
        link: touristShuttleAffiliateLink,
        cta: 'Ride the Shuttle, Skip the Struggle'
      },
      {
        type: 'h2',
        title: 'Quick Comparison Table'
      },
      {
        type: 'table',
        headers: ['Option', 'Cost (NT$)', 'Time', 'Best For'],
        rows: [
          ['Airport MRT (Express)', '160', '35 min', 'Most travelers, day arrivals'],
          ['Airport MRT (Commuter)', '160', '50 min', 'Travelers heading to intermediate stations'],
          ['Bus 1819 (Kuo-Kuang)', '135', '55-70 min', 'Budget travelers, late night arrivals'],
          ['Bus 1960 (UBus)', '200', '45-70 min', 'Xinyi/Taipei 101 area'],
          ['Bus 1961 (UBus)', '105-200', '60-90 min', 'Ximending area'],
          ['Taxi', '1,000-1,500', '40-60 min', 'Groups, heavy luggage, late night'],
          ['Private Transfer', '1,500-2,500', '40-60 min', 'First-timers, peace of mind']
        ]
      },
      {
        type: 'h2',
        title: 'Which Option Should You Pick?'
      },
      {
        type: 'p',
        content: `If your hotel is near Taipei Main Station or along an MRT line, the Airport MRT is the easiest choice. It is fast, frequent, and costs a flat NT$160.`
      },
      {
        type: 'p',
        content: `If you are on a budget or arriving late at night, go with Bus 1819. It costs the least and operates 24 hours.`
      },
      {
        type: 'p',
        content: `If you are staying in the Xinyi district near Taipei 101, take Bus 1960. If you are heading to Ximending, Bus 1961 drops you close by.`
      },
      {
        type: 'p',
        content: `If you are traveling with family, have a lot of luggage, or simply want the trip to be as smooth as possible, book a taxi or private transfer. The extra cost is worth it when you are tired after a long flight.`
      },
      {
        type: 'p',
        content: `And if you are heading straight to Taichung or further south, skip Taipei entirely -- take the direct bus or connect to the HSR from the airport.`
      }
    ]
  }
}

export default function EssentialGuide() {
  const { slug } = useParams()
  const guide = guideContent[slug]

  if (!guide) {
    return (
      <div className="essentials-page">
        <div className="essentials-navbar">
          <div className="essentials-navbar-inner">
            <Link to="/" className="essentials-navbar-logo">
              <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" />
              <span>TAIWAN EXPERIENCE</span>
            </Link>
            <Link to="/essentials" className="essentials-navbar-back">Back to Essentials</Link>
          </div>
        </div>
        <div className="essentials-container" style={{ textAlign: 'center', paddingTop: '8rem' }}>
          <h1>Guide not found</h1>
          <p style={{ color: '#888', marginTop: '1rem' }}>This guide is still being written. Check back soon.</p>
          <Link to="/essentials" style={{ color: '#c0392b', display: 'inline-block', marginTop: '1rem' }}>Back to Essentials</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="essentials-page">
      <nav className="essentials-navbar">
        <div className="essentials-navbar-inner">
          <Link to="/" className="essentials-navbar-logo">
            <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" />
            <span>TAIWAN EXPERIENCE</span>
          </Link>
          <Link to="/essentials" className="essentials-navbar-back">Back to Essentials</Link>
        </div>
      </nav>

      <article className="guide-article">
        <div className="guide-header">
          <div className="guide-header-inner">
            <Link to="/essentials" className="guide-breadcrumb">Essentials</Link>
            <h1 className="guide-title">{guide.title}</h1>
            <p className="guide-subtitle">{guide.subtitle}</p>
          </div>
        </div>

        <div className="guide-content">
          {guide.sections.map((section, i) => {
            if (section.type === 'intro') {
              return (
                <div key={i} className="guide-intro">
                  {section.content.split('\n\n').map((p, j) => (
                    <p key={j}>{p.trim()}</p>
                  ))}
                </div>
              )
            }
            if (section.type === 'h2') {
              return <h2 key={i} className="guide-h2">{section.title}</h2>
            }
            if (section.type === 'h3') {
              return <h3 key={i} className="guide-h3">{section.title}</h3>
            }
            if (section.type === 'p') {
              return <p key={i} className="guide-p">{section.content}</p>
            }
            if (section.type === 'list') {
              return (
                <ul key={i} className="guide-list">
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            }
            if (section.type === 'affiliate') {
              const link = section.link || affiliateLink
              const btnText = section.cta || 'Check Price & Availability'
              return (
                <div key={i} className="guide-affiliate">
                  <p className="guide-affiliate-text">{section.text}</p>
                  {section.note && <p className="guide-affiliate-note">{section.note}</p>}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="guide-affiliate-btn"
                  >
                    {btnText}
                  </a>
                </div>
              )
            }
            if (section.type === 'table') {
              return (
                <div key={i} className="guide-table-wrapper">
                  <table className="guide-table">
                    <thead>
                      <tr>{section.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, j) => (
                        <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
            if (section.type === 'qna') {
              return (
                <div key={i} className="guide-qna">
                  <p className="guide-q"><strong>Q: {section.q}</strong></p>
                  <p className="guide-a">A: {section.a}</p>
                </div>
              )
            }
            return null
          })}
        </div>
      </article>

      <footer className="essentials-footer">
        <div className="essentials-footer-inner">
          <Link to="/essentials" className="essentials-footer-link">Back to Essentials</Link>
          <p>(c) 2026 Taiwan Experience</p>
        </div>
      </footer>
    </div>
  )
}