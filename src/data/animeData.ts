import { Anime, WatchHistoryItem } from '../types';

export const INITIAL_ANIME_LIST: Anime[] = [
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    originalTitle: 'Shingeki no Kyojin',
    year: 2013,
    format: 'TV',
    seasonsCount: 4,
    totalEpisodes: 89,
    rating: 9.1,
    genres: ['Action', 'Dark Fantasy', 'Drama'],
    featured: true,
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcOmFOiNfwadQvwrHXWhyfisUl6oDnb4Y7Z_0okGna7Q9XYaWlx-3gYk3Y_QT3bxxF-y88MpmxoPitniFdQ9onN8NNjdc3ukUBMfghCpkcAm86uJaLsPrQlQVFC9C8HLQNN3n3g21BKF0fRkU-b3WQFGEcIttHrxaiS9OXn4Cg7gxQH_lER8ND30eGym3cmdyPdulQ7AOlLM14sqoU6hUkz-vzq6qSi3Wuoql-QLEgjm2ijMmOFMBe2A',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDy7CSUdW0_diodLPIwvpKcknyFEv2zc_jyqpO5L9XNrGx_XvMOvBtimUuhQeqBfu7Eb6FyXNE5TQDzgz3PqU3DaQ4KfHJhw2WB9texw_Cy0iQkSMUsd3AP7lxHLS-tOjNcmaKPHbl3o0jDG61ILKWIvAS5veDlvqYitu0XMQzDynxY3Jo2VoPwnEdXTNZFsPzSuDgy6JUAiPU6Xc1Nb-xG3nUyIxrxHVLbTYbtFNKL_mMaOT38qNZqCA',
    synopsis:
      'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure...',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'aot-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. To You, in 2000 Years',
            duration: '24 min',
            synopsis:
              'A peaceful civilian life is shattered when a Colossal Titan breaches the outermost wall, unleashing terror on the Shiganshina District.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBtRUYyzLVMvnCP3HzTEzgyUWGcIfH2g-9H4Xxj3IqTNkfbJE9dYKEvVFmbI1LLVPLVj6bF7Tu2qkYWBufAbgTgvc9lA9Y3AXVKqTdiHhVLCCxEvJk6M8tcSnho_EmFksuxSPnF1shHypznNH-X2Qb_hwtNq0PtRfSIiA7oRKkHO9vfOIkKgBI5MFKj4mgLd1raaY1t5tSFUM6bfi8zo1y_JYX8RtS_uPbNSj2qoctZCJptmCt1cE0rWw',
            progressPercent: 100,
            watched: true,
          },
          {
            id: 'aot-s1-e2',
            seasonNumber: 1,
            episodeNumber: 2,
            title: '2. That Day',
            duration: '24 min',
            synopsis:
              'The Titans pour into the city. Eren, Mikasa, and Armin must flee on the evacuation boats while witnessing unimaginable tragedy.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-31wwbFbl_DxGAhSjo6ip3VRratopazx10ieMUMxwOpshnPck2gdkSZs5jBLNKItWpa3JvuDEpcddY_AtwZZC7PrMFcJ3My6y5DI8_5ihbAknyFQnzMzQy5vSeZau2D-OARmi5b5OOCscxHZt5JhQff2quwUnyRcNfvB6rT7F5HcvkM4wP5Eb5rd-elLUe7gdtiqgMtwRmSvV6VE9YYf2DAB92A00Efmj3xJwKUB0NGCvHU32vm61A',
            progressPercent: 45,
            watched: false,
          },
          {
            id: 'aot-s1-e3',
            seasonNumber: 1,
            episodeNumber: 3,
            title: '3. A Dim Light Amid Despair',
            duration: '24 min',
            synopsis:
              'Eren begins his military training to join the Survey Corps, but struggles with the vertical maneuvering gear balance tests.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAZAUhYdZMGZVrgflOGWOk8mpJfoFmdxN8T582JcS_7sHJqdUGYZYjvKa_AcV5oP8aJY-RdQUm4Fv00nbnYYtQt9YgGlZN17Bzf5Zlo8n8YX-oZM_fzKLqTSRlZwqBGLDmrcw-1yU2BDBwPgzs_JVAAPC779ksFpBDEz5awCi0yufut606tKHRzYnwwfAq9brsOdgo9ObYLuoGvA4lvnWqnro5hVtZZFLXi5lweAqnq7Dv056fZML_gBQ',
            progressPercent: 0,
            watched: false,
          },
          {
            id: 'aot-s1-e4',
            seasonNumber: 1,
            episodeNumber: 4,
            title: '4. The Night of the Graduation Ceremony',
            duration: '24 min',
            synopsis:
              'The top cadets of the 104th Training Corps prepare to make their career choices between Military Police and Survey Corps.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDy7CSUdW0_diodLPIwvpKcknyFEv2zc_jyqpO5L9XNrGx_XvMOvBtimUuhQeqBfu7Eb6FyXNE5TQDzgz3PqU3DaQ4KfHJhw2WB9texw_Cy0iQkSMUsd3AP7lxHLS-tOjNcmaKPHbl3o0jDG61ILKWIvAS5veDlvqYitu0XMQzDynxY3Jo2VoPwnEdXTNZFsPzSuDgy6JUAiPU6Xc1Nb-xG3nUyIxrxHVLbTYbtFNKL_mMaOT38qNZqCA',
            progressPercent: 0,
            watched: false,
          },
        ],
      },
      {
        seasonNumber: 2,
        title: 'Season 2',
        episodes: [
          {
            id: 'aot-s2-e1',
            seasonNumber: 2,
            episodeNumber: 1,
            title: '1. Beast Titan',
            duration: '24 min',
            synopsis:
              'A terrifying hairy giant Titan capable of speech appears in Wall Rose, ordering smaller Titans to attack.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCBR6q6NqRPM-zRxua3EJbxAWt5625mN9fgMg0Lf5X3ScBa6m5A1kL0m2-SiJTyMwDvR7rSViQbOD6Sm3_QM_OtRrNf9yCr8N5Z80tjSTkw6VUgcZuU8I6SwjEL0hKewly6_7dtIp0HH5uyykgiTSEFJJZ2nflwdtlk4nXbsFUyy3_ZV1xndaIuq7lSHDdMgjagVCRGiyq9EFkDrKSj96-qDejCwWwDVf4MykjJ04D37DbVW76WwwSS2Q',
            progressPercent: 0,
            watched: false,
          },
        ],
      },
      {
        seasonNumber: 3,
        title: 'Season 3',
        episodes: [
          {
            id: 'aot-s3-e1',
            seasonNumber: 3,
            episodeNumber: 1,
            title: '1. Smoke Signal',
            duration: '24 min',
            synopsis:
              'Captain Levi and the new Special Operations Squad go underground as the Royal Government turns hostile.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDCzmv5M22WGpGt9hvXP6xPeYDVvugS18cWmPegsKYIuHujb4IpOcFlQcpYTtisMvwSagSHyUstHdOQJly0N7Mdy8PbOi9duZ8GKRmV1RirGmYFB-E56sFCOSkVbb7b-tjnzhJfVAMW0NcChQm66-3WVAOmfcyAPwtEc26eunXrvVcoxnSXmf7sHBsIDJ0sW1ACgSqQRRrbbuKyWQ58HO6J8mI_qzW8jQYT1nmbe_38t0hP2iXli8312A',
            progressPercent: 0,
            watched: false,
          },
        ],
      },
      {
        seasonNumber: 4,
        title: 'Season 4 (The Final Season)',
        episodes: [
          {
            id: 'aot-s4-e12',
            seasonNumber: 4,
            episodeNumber: 12,
            title: '12. Memories of the Future',
            duration: '24 min',
            synopsis:
              'Eren and Zeke journey through the memories of their father Grisha, discovering shocking truths about the Attack Titan.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAqqDkerjPjVYfuJyATd-Nb2ZRSuY0lLnL6z2VLYUITiey3tAdzktuD-U8nYzA9x8rpBcHE5VI7x0cRVbfeC6ZHE7IOroG3meCxP4HwoM6imgB2k_tRISxhzRF3lF7mvx7ryImgNZAj5sP36DRRc87opaTh4_qUQCj_6o7HJEQZIjJsjic3GNHg5HNN3WX7Jn5QNtKRthuEIjxY8yToon7eSpajEG3C_YR5Id7JpX3COBPnz645OPLrOg',
            progressPercent: 65,
            watched: false,
          },
          {
            id: 'aot-s4-e13',
            seasonNumber: 4,
            episodeNumber: 13,
            title: '13. From You, 2,000 Years Ago',
            duration: '24 min',
            synopsis:
              'The tragic history of Ymir the Founder is revealed as the Rumbling begins across the ocean shores.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDVTII_GrVGPkVgkyX3xN5e9g0q9tSJ3xkRByuzouB8lub8Piy2bqkG1e5YDG8Hyiphg5F2OkACCUl0rZWbSaphtBfTQwCQnbFgf7KC_SGYE7FSz4X7bvrFAYVN6vX8ti3YTwR9NXj_lB785pt3TGBV0noWHWgs8Yq9lp5o-j6DqnM7ZjomWQMAPHNGRtHq7K80b56mFS3GjZ0vWbHUIIMBTSRH6j27syQqPkuNCBq5U-ijXve8CDpoTw',
            progressPercent: 0,
            watched: false,
          },
          {
            id: 'aot-s4-e14',
            seasonNumber: 4,
            episodeNumber: 14,
            title: '14. Night of the End',
            duration: '24 min',
            synopsis:
              'Former enemies unite around a fragile campfire to plan an impossible mission to stop the world-ending Rumbling.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBVi5tqt1Np2RSo6rh2MseY1zOy9Lfp_lQPP5kt6lyOwAGtjIqdkpLEU89YZp3MDVCplXPrhFFW3c89MQL_9jIPBZtKxEBVzAz9eXmvCW5YkJa9QZKQ0hUCOCkYdMxFI1bjQCM9FScT5mYCXSIJz6KFMpllwcu2o_kD4fQJgrYygypKVaRUl7RIdaFye1T-KUsi0syR3TMQiZYssRMFLeH_G6ojP8d0MoRMcxbNc9T5kpPBmLs_GiQPuw',
            progressPercent: 0,
            watched: false,
          },
        ],
      },
    ],
  },
  {
    id: 'neon-genesis-skyline',
    title: 'Neon Genesis Skyline',
    year: 2024,
    format: 'TV',
    seasonsCount: 1,
    totalEpisodes: 12,
    rating: 8.9,
    genres: ['Cyberpunk', 'Sci-Fi', 'Action'],
    badge: 'New Episode',
    badgeType: 'tertiary',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSo70xr5U6wrR-UcOE6UEmqLA1hV2oECiOhMQl8dnC7obyE4lU4NhYLxjJ8qSZM4ETFCNs8c8GHde8VBR9E4IYwWoRDJl1i2gN3U8p_Lsd445vUsabDtzNZgRsV8zEdTaPMhXUOZKwzqmkqvC5VyzXV1cSDw_BBei-VJHkSbHRPej3xZRgWzVRC6LzG6cdGF3-HjO27MiSstiy79tbWdnEcofqWLZ6GDQgpit1U5CQtGW6eSLf9UzH0A',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADVNY-ZpoMmCROZ9K4A-QOSrrJdv5jqthaCHeKxBE7-3PBfKDqKSNU3WnqyC_8C5glK5uwx6noWzskhS2b9dr8fgpT3VRsdrWBGC4Bwd_9TcR1sdbJNQiKbeYlR_1uBouCt1HGT-o9aU86eHjGQs_X6vUrDW1Y2-qoFf-tmFasvzJhVZBru-cIvukbC-Y9QqO_3-bJA9zyHelP1zYDbFIx-ioiEe7ZTbwT3WkI8dfz85eATtvnYHRfWQ',
    synopsis:
      'In Neo-Kowloon 2099, a mercenary katana specialist unravels an AI conspiracy deep within the neon skyscrapers while evading corporate cyborg kill-teams.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'ngs-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Neon Rain',
            duration: '23 min',
            synopsis:
              'A routine data-courier extraction turns into a high-speed skybridge shootout across vertical city strata.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuADVNY-ZpoMmCROZ9K4A-QOSrrJdv5jqthaCHeKxBE7-3PBfKDqKSNU3WnqyC_8C5glK5uwx6noWzskhS2b9dr8fgpT3VRsdrWBGC4Bwd_9TcR1sdbJNQiKbeYlR_1uBouCt1HGT-o9aU86eHjGQs_X6vUrDW1Y2-qoFf-tmFasvzJhVZBru-cIvukbC-Y9QqO_3-bJA9zyHelP1zYDbFIx-ioiEe7ZTbwT3WkI8dfz85eATtvnYHRfWQ',
          },
        ],
      },
    ],
  },
  {
    id: 'shadow-of-the-erdtree',
    title: 'Shadow of the Erdtree',
    year: 2024,
    format: 'TV',
    seasonsCount: 1,
    totalEpisodes: 10,
    rating: 9.3,
    genres: ['Dark Fantasy', 'Adventure', 'Action'],
    badge: 'Sub/Dub',
    badgeType: 'primary',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBD2P-neKDFA1W3UkXt2XIt4J2qgVr9EfrZEZsahWEpMK9zhG8SZCmZggLIIQNQ0a2s1jjse94sqjxk9JNgljuo43Syvmm-mFSoIin6lsu50DdCYlv3oDolB_F0ChVkQhpJ5mcD7AFIltFKJTm2Fd5T0FSfR_N4TJD8x7bVzVz8WZ52s-PlU4IIR_oCxfkyja4XAbDPY5qWquEwpbc-JG7dEgceqNwXwVjkIZ28X4e2G67rzIDwpK81A',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDglRM39GWFvIOTpAlyEzadhltXHUrROrfyAjjXbcFaVlIXlPheLqM65DdBk9PNC_UTKea0QpUY2zlEW8gG7-hHQ-P-Y5ohlLoWXps6WLT-adug1BtZg8v1sy1X8jim1xJia1Yn0YM_rYl3JCep1SCxfps93_MlY7gOODsSE5cqWpyR50M94303o1xa2w1viorO60ZF1d7QotQISkBjus1efRqepkA3g5Zmo2FcQiewPhw7QWYeK8E3Hg',
    synopsis:
      'Guided by Empyrean Miquella, a lone Tarnished warrior steps into the Land of Shadow, a realm obscured by the Erdtree where goddess Marika first set foot.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'sote-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. The Realm of Shadow',
            duration: '26 min',
            synopsis:
              'Touching the withered arm in Mohgwyn Palace opens the veil to a veiled realm scorched by Messmer the Impaler.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBBD2P-neKDFA1W3UkXt2XIt4J2qgVr9EfrZEZsahWEpMK9zhG8SZCmZggLIIQNQ0a2s1jjse94sqjxk9JNgljuo43Syvmm-mFSoIin6lsu50DdCYlv3oDolB_F0ChVkQhpJ5mcD7AFIltFKJTm2Fd5T0FSfR_N4TJD8x7bVzVz8WZ52s-PlU4IIR_oCxfkyja4XAbDPY5qWquEwpbc-JG7dEgceqNwXwVjkIZ28X4e2G67rzIDwpK81A',
          },
        ],
      },
    ],
  },
  {
    id: 'whispers-of-spring',
    title: 'Whispers of Spring',
    originalTitle: 'Sakura no Yakusoku',
    year: 2023,
    format: 'Movie',
    seasonsCount: 1,
    totalEpisodes: 1,
    rating: 8.8,
    genres: ['Romance', 'Slice of Life', 'Drama'],
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXWBHInLWVHJEXf_vsYRSogCjVT1NJ6tLt_2AVLr6mS_u0YtBaxGqbmyEwC_CO5Rll0NaCGrP4uIwdOpK_l7NXsBprvy7jLIlWXSQXAiXNMRS2yLNEVRAKqGQNdY1tP-zE_KnXH59tRlLbUMJNHIrJ8ROrQcTPiM059rYMZK0EH51pH9Y9sCv3F4JoDB656W0SwLn1hv3fgEbPsVSsfnMFMKUEm0Sk7Z_a0CO9RGspZoEs7MCNnOL4Fw',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuyJ5kysejIyFqtbc6m66VOBy_hrcTGXUQgx_qGcfgK3t_0BnQFsUUDxBH56TWuKF5HfcYhTj13UVgZ-fxKpmXEfXK4PAp1Lo8sTX2tePzZD6INCqL5ogOod3LXXtQJRAo4tZ9eeZvcNu0o2o3g03e784t5BuNCq4erO0jWATPIGiRZIbbl_A1TTgtMOgiebkrmf1RB17bxpUiAtO3asJzNfZRRSg3COcBxSe8t25Gtbw8qiWzq3NdmQ',
    synopsis:
      'A heartwarming tale of youth, unspoken promises, and blooming romance under the twilight sakura canopy in a sleepy coastal town.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Feature Film',
        episodes: [
          {
            id: 'wos-movie',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Full Movie',
            duration: '108 min',
            synopsis:
              'Two childhood friends reconnect during the final spring of high school before heading to distant universities.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAXWBHInLWVHJEXf_vsYRSogCjVT1NJ6tLt_2AVLr6mS_u0YtBaxGqbmyEwC_CO5Rll0NaCGrP4uIwdOpK_l7NXsBprvy7jLIlWXSQXAiXNMRS2yLNEVRAKqGQNdY1tP-zE_KnXH59tRlLbUMJNHIrJ8ROrQcTPiM059rYMZK0EH51pH9Y9sCv3F4JoDB656W0SwLn1hv3fgEbPsVSsfnMFMKUEm0Sk7Z_a0CO9RGspZoEs7MCNnOL4Fw',
          },
        ],
      },
    ],
  },
  {
    id: 'mecha-core-zeta',
    title: 'Mecha Core Zeta',
    year: 2024,
    format: 'TV',
    seasonsCount: 2,
    totalEpisodes: 24,
    rating: 8.7,
    genres: ['Mecha', 'Sci-Fi', 'Action'],
    badge: 'Trending',
    badgeType: 'secondary',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPrNwCvEur6gKspWnS-v7nN88iaXA1X8cTlSfERMIhmLuwjZDgFYWgbDR1b7nRMvoVWNYTH73kuW6O--Lau_W-ZAE82kVIW3paMCVkVq3zM5AtD9HBc0phvIWESL_YiN_CZujJi7SjE8oL36fBwuNLfeY01UqhpS5cRPOb-dwzXKhPcSCEc4c-mXW7bPTMzbp4Hl2IDkysDbh2eHuA1VxIKacixJGtC5faDmUYFqdjSDrFq5BR_iFoSw',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPrNwCvEur6gKspWnS-v7nN88iaXA1X8cTlSfERMIhmLuwjZDgFYWgbDR1b7nRMvoVWNYTH73kuW6O--Lau_W-ZAE82kVIW3paMCVkVq3zM5AtD9HBc0phvIWESL_YiN_CZujJi7SjE8oL36fBwuNLfeY01UqhpS5cRPOb-dwzXKhPcSCEc4c-mXW7bPTMzbp4Hl2IDkysDbh2eHuA1VxIKacixJGtC5faDmUYFqdjSDrFq5BR_iFoSw',
    synopsis:
      'Deep in the Elysian Nebula, an elite test pilot awakens the forbidden ancient biomechanical frame Zeta to defend the orbital colony from an alien swarm.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'mcz-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Awakening of the Blue Star',
            duration: '24 min',
            synopsis:
              'Cadet Ren synchs with the slumbering Zeta unit during an unexpected catastrophic fleet ambush.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAPrNwCvEur6gKspWnS-v7nN88iaXA1X8cTlSfERMIhmLuwjZDgFYWgbDR1b7nRMvoVWNYTH73kuW6O--Lau_W-ZAE82kVIW3paMCVkVq3zM5AtD9HBc0phvIWESL_YiN_CZujJi7SjE8oL36fBwuNLfeY01UqhpS5cRPOb-dwzXKhPcSCEc4c-mXW7bPTMzbp4Hl2IDkysDbh2eHuA1VxIKacixJGtC5faDmUYFqdjSDrFq5BR_iFoSw',
          },
        ],
      },
    ],
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    year: 2019,
    format: 'TV',
    seasonsCount: 4,
    totalEpisodes: 55,
    rating: 8.9,
    genres: ['Action', 'Supernatural', 'Historical'],
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpoQzkUr3n5cE4Bj-Tx9OCs4-JpHR9caLrZJ-T6CwjY26vos_Ymds-6oLhv5NyiCngQCEIC8AjK0IomdVtx70R3OJz2J8DLTiJG2YJaBBrqn0Um21-LR078eiSd8NEv5s-QHZf1zwr3AS2S6-unhPDaFYCUzUgvygoT0YEhF3hVEj_sVY5bXt_Xl5e6-CfClc4GGRUtrXlsgNwXo4iA1JhM6AfxbFoxQHHh0QLJst_ikjTJl4Qo5MA3Q',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpoQzkUr3n5cE4Bj-Tx9OCs4-JpHR9caLrZJ-T6CwjY26vos_Ymds-6oLhv5NyiCngQCEIC8AjK0IomdVtx70R3OJz2J8DLTiJG2YJaBBrqn0Um21-LR078eiSd8NEv5s-QHZf1zwr3AS2S6-unhPDaFYCUzUgvygoT0YEhF3hVEj_sVY5bXt_Xl5e6-CfClc4GGRUtrXlsgNwXo4iA1JhM6AfxbFoxQHHh0QLJst_ikjTJl4Qo5MA3Q',
    synopsis:
      'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon herself. Tanjiro sets out on a dangerous journey to avenge his family and cure his sister.',
    seasons: [
      {
        seasonNumber: 2,
        title: 'Entertainment District Arc',
        episodes: [
          {
            id: 'ds-s2-e7',
            seasonNumber: 2,
            episodeNumber: 7,
            title: '7. Transformation',
            duration: '24 min',
            synopsis:
              'Tanjiro taps into the Sun Breathing form while Tengen Uzui clashes against the Upper Rank demon Daki.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDpoQzkUr3n5cE4Bj-Tx9OCs4-JpHR9caLrZJ-T6CwjY26vos_Ymds-6oLhv5NyiCngQCEIC8AjK0IomdVtx70R3OJz2J8DLTiJG2YJaBBrqn0Um21-LR078eiSd8NEv5s-QHZf1zwr3AS2S6-unhPDaFYCUzUgvygoT0YEhF3hVEj_sVY5bXt_Xl5e6-CfClc4GGRUtrXlsgNwXo4iA1JhM6AfxbFoxQHHh0QLJst_ikjTJl4Qo5MA3Q',
            progressPercent: 68,
          },
        ],
      },
    ],
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    year: 1999,
    format: 'TV',
    seasonsCount: 21,
    totalEpisodes: 1100,
    rating: 9.0,
    genres: ['Action', 'Adventure', 'Comedy', 'Shonen'],
    trendingRank: 1,
    trendingCategory: 'Shonen',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3VTZJ9KZAJhUy3dO6UAMzZcKwPg19VtHIAjML-_wz6foUDZDe9h4ZqxzKjHjGIZlUVq5ujYRr-7m7C0GJPNtqDa0ArCrsu0xKBV5MCmKzptmLDf1HJDR_Mft3_01gH1wPOT8dkRsSUODy9QAJCSvSfpRMig4pbel_L1ron8HoyQO5H9jO0gOrZJa7QWcCAHeTWI7ZDTEU4G6B4t_fx0DX3euLjwmPPfK_dRNna1k1sda9o9nSvSNgNw',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6p2JyVWTI_lXjzujs4kYdN9ZrDZXmWW_QB-x3t-PDDuURFehUgG2WmbokK_jPhr6ajjqED8QQ5saH9KQaqZN0isc8DzzQePcCDL_UM5kKOKcJGP5IUGF2AJCYxNxgMLB7yEtuFXwMI44wfuUriXGojTXa4DI3qq5e0oPdHgYnDDtUlWuCum-8BoKz_5DaBOUxwJIGXWbpCj1ezmuK-DqSNQ2Ob4JA8_3zleEjdy6jV_fgVkD91hRhbw',
    synopsis:
      'Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates with his crew of Straw Hat Pirates.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'East Blue',
        episodes: [
          {
            id: 'op-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. I\'m Luffy! The Man Who Will Become the Pirate King!',
            duration: '24 min',
            synopsis:
              'A barrel washed ashore carries Monkey D. Luffy, a rubber boy with big dreams of the Grand Line.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuC3VTZJ9KZAJhUy3dO6UAMzZcKwPg19VtHIAjML-_wz6foUDZDe9h4ZqxzKjHjGIZlUVq5ujYRr-7m7C0GJPNtqDa0ArCrsu0xKBV5MCmKzptmLDf1HJDR_Mft3_01gH1wPOT8dkRsSUODy9QAJCSvSfpRMig4pbel_L1ron8HoyQO5H9jO0gOrZJa7QWcCAHeTWI7ZDTEU4G6B4t_fx0DX3euLjwmPPfK_dRNna1k1sda9o9nSvSNgNw',
          },
        ],
      },
    ],
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    year: 2020,
    format: 'TV',
    seasonsCount: 2,
    totalEpisodes: 47,
    rating: 8.8,
    genres: ['Supernatural', 'Action', 'Dark Fantasy'],
    trendingRank: 2,
    trendingCategory: 'Supernatural',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Cx0W61pICAqjHCG2DBNTqYUZVQ6RIu0kH8rMtNXWlMRA4eSQLcUUdNFOe5YKNZhM4a0NpSHbP_3rA0ChK-VHUvjmIHBDrjBpKm5x0kGYCgssX5Mkgpuf07OBlW4j0TgmxcBjIwvxB2vukqJBbwJ8cftqUdU62HESx_GmILbO5YhDtUM1DhsFGaiYfrfIJWxf0kzM_SxObCV_OGfVOGLwL1tDnS1FAuBtFobcTcg8USsqFZneoTa8iA',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCs7S2vaNHG5hqJQ1ClpoeUy6XHwoaE7ESrv7tJDH0xXPER4S1MqSnbkEE2KdE67IhUb5rNHmrnQQvFXFNGd0xyUs35nZpyl4hqdOYErxozb04ufBgYgtsdiZy4lH7NejaUIc17vHTKl0kvb-MJm-ru33Mjv_pl68pDsOvMq724VozlwAai85Pwao18VtimWa38iHSA5oQnh78f8_42Nuk_CvJBri-7h8j-PSdW3QN_83aKqMTMpxv1Rw',
    synopsis:
      'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'jjk-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Ryomen Sukuna',
            duration: '24 min',
            synopsis:
              'Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life until cursed spirits attack.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Cx0W61pICAqjHCG2DBNTqYUZVQ6RIu0kH8rMtNXWlMRA4eSQLcUUdNFOe5YKNZhM4a0NpSHbP_3rA0ChK-VHUvjmIHBDrjBpKm5x0kGYCgssX5Mkgpuf07OBlW4j0TgmxcBjIwvxB2vukqJBbwJ8cftqUdU62HESx_GmILbO5YhDtUM1DhsFGaiYfrfIJWxf0kzM_SxObCV_OGfVOGLwL1tDnS1FAuBtFobcTcg8USsqFZneoTa8iA',
          },
        ],
      },
    ],
  },
  {
    id: 'naruto-shippuden',
    title: 'Naruto Shippuden',
    year: 2007,
    format: 'TV',
    seasonsCount: 21,
    totalEpisodes: 500,
    rating: 8.7,
    genres: ['Action', 'Adventure', 'Ninja'],
    trendingRank: 3,
    trendingCategory: 'Ninja',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDML9usda664GeMKo4Bb_jKS2tJs6favUpalLG6wg55A5HS5DT1_UgjqarJ4OHT7MKadoDjrpcOaUJJaJYt0xG0X9FABR4DY75U7vGliJWx9CK4z2ILUele5w3qtNXVPp5xfZYWZxzIBngKHeQrPExm5Q_BQOWdtcLRC9qWXPrVTB4L98LOXdqxDMDv6seiAZbC1GlyK6jQolMTZoDyco5XwmqbwrVTuECYJ0r6fLU-hI5TWtL6fmLAPw',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDML9usda664GeMKo4Bb_jKS2tJs6favUpalLG6wg55A5HS5DT1_UgjqarJ4OHT7MKadoDjrpcOaUJJaJYt0xG0X9FABR4DY75U7vGliJWx9CK4z2ILUele5w3qtNXVPp5xfZYWZxzIBngKHeQrPExm5Q_BQOWdtcLRC9qWXPrVTB4L98LOXdqxDMDv6seiAZbC1GlyK6jQolMTZoDyco5XwmqbwrVTuECYJ0r6fLU-hI5TWtL6fmLAPw',
    synopsis:
      'Naruto Uzumaki returns to the Hidden Leaf Village older and stronger after two and a half years of training with Jiraiya, ready to confront the mysterious Akatsuki organization.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Kazekage Rescue',
        episodes: [
          {
            id: 'nar-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Homecoming',
            duration: '23 min',
            synopsis:
              'Naruto returns to Konoha and reunites with Sakura and Master Kakashi before taking the new bell test.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDML9usda664GeMKo4Bb_jKS2tJs6favUpalLG6wg55A5HS5DT1_UgjqarJ4OHT7MKadoDjrpcOaUJJaJYt0xG0X9FABR4DY75U7vGliJWx9CK4z2ILUele5w3qtNXVPp5xfZYWZxzIBngKHeQrPExm5Q_BQOWdtcLRC9qWXPrVTB4L98LOXdqxDMDv6seiAZbC1GlyK6jQolMTZoDyco5XwmqbwrVTuECYJ0r6fLU-hI5TWtL6fmLAPw',
          },
        ],
      },
    ],
  },
  {
    id: 'frieren',
    title: "Frieren: Beyond Journey's End",
    year: 2023,
    format: 'TV',
    seasonsCount: 1,
    totalEpisodes: 28,
    rating: 9.2,
    genres: ['Fantasy', 'Adventure', 'Drama'],
    newRelease: true,
    badge: 'New EP 12',
    badgeType: 'error',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAI4tnXVWwRvmCMvjIIq5xf8rht7y0FXYe0cnH1oQBCk915xD8q5Hh823A2rNHZ6FdLzE3VF5btlw55JPybrry4KFL39GhIYapcRdxOFp0JBhJ4vYd_3jekSniIjPWYrWQ0zNj3nV9AjWdFVFf-T11Ek-KSSolcJtmM5qIoB-peDNZtqfmQ4pbTXjoNkFcpalHT8vQiHS1QlojOgZSVV8MDSb4OG_9I8xBTPQ0Xr2cuiQyvJEiO9177tw',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAI4tnXVWwRvmCMvjIIq5xf8rht7y0FXYe0cnH1oQBCk915xD8q5Hh823A2rNHZ6FdLzE3VF5btlw55JPybrry4KFL39GhIYapcRdxOFp0JBhJ4vYd_3jekSniIjPWYrWQ0zNj3nV9AjWdFVFf-T11Ek-KSSolcJtmM5qIoB-peDNZtqfmQ4pbTXjoNkFcpalHT8vQiHS1QlojOgZSVV8MDSb4OG_9I8xBTPQ0Xr2cuiQyvJEiO9177tw',
    synopsis:
      'An elven mage and her fellow adventurers have defeated the Demon King and brought peace to the land. Decades later, Frieren witnesses her former companions pass away from old age, inspiring her to embark on a journey to truly understand humanity.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'fri-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: "1. The Journey's End",
            duration: '24 min',
            synopsis:
              'The hero party returns victorious after a 10-year quest to defeat the Demon King, watching the Era Meteors together.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAI4tnXVWwRvmCMvjIIq5xf8rht7y0FXYe0cnH1oQBCk915xD8q5Hh823A2rNHZ6FdLzE3VF5btlw55JPybrry4KFL39GhIYapcRdxOFp0JBhJ4vYd_3jekSniIjPWYrWQ0zNj3nV9AjWdFVFf-T11Ek-KSSolcJtmM5qIoB-peDNZtqfmQ4pbTXjoNkFcpalHT8vQiHS1QlojOgZSVV8MDSb4OG_9I8xBTPQ0Xr2cuiQyvJEiO9177tw',
          },
        ],
      },
    ],
  },
  {
    id: 'cyber-runner-2099',
    title: 'Cyber-Runner 2099',
    year: 2024,
    format: 'TV',
    seasonsCount: 1,
    totalEpisodes: 8,
    rating: 8.6,
    genres: ['Sci-Fi', 'Cyberpunk', 'Action'],
    newRelease: true,
    badge: 'New EP 1',
    badgeType: 'error',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtM9IJDO7K7bdc_XAVbb6cUjBgyDcdrOCIvMfmz6t9sL-v7Nompc_V947LwIX9D3ouweD6UxphnSumkDJqWA7nQNQt8BIc0kbGOT_9qGhzkvrYaOvbuPTl0rg9NvFRLsJSB0XzrmRWlf1DNBDUog2AuukDNK_je3Eu8e5Nl4lUu35OpP3NIDCTrQWSyZ_VL_iderfFxd_fRPGj2ukWEh8L0NikgDXoJrdAjx4tfPFxgi2ZcTZYlGlM4Q',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtM9IJDO7K7bdc_XAVbb6cUjBgyDcdrOCIvMfmz6t9sL-v7Nompc_V947LwIX9D3ouweD6UxphnSumkDJqWA7nQNQt8BIc0kbGOT_9qGhzkvrYaOvbuPTl0rg9NvFRLsJSB0XzrmRWlf1DNBDUog2AuukDNK_je3Eu8e5Nl4lUu35OpP3NIDCTrQWSyZ_VL_iderfFxd_fRPGj2ukWEh8L0NikgDXoJrdAjx4tfPFxgi2ZcTZYlGlM4Q',
    synopsis:
      'A street kid trying to survive in a technology and body modification-obsessed city of the future loses everything and chooses to stay alive by becoming an edgerunner.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'cr-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Chromed Up',
            duration: '25 min',
            synopsis:
              'In the neon drench of Night City, an illegal high-grade cybernetic spine implants supernatural reflexes in a rogue courier.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAtM9IJDO7K7bdc_XAVbb6cUjBgyDcdrOCIvMfmz6t9sL-v7Nompc_V947LwIX9D3ouweD6UxphnSumkDJqWA7nQNQt8BIc0kbGOT_9qGhzkvrYaOvbuPTl0rg9NvFRLsJSB0XzrmRWlf1DNBDUog2AuukDNK_je3Eu8e5Nl4lUu35OpP3NIDCTrQWSyZ_VL_iderfFxd_fRPGj2ukWEh8L0NikgDXoJrdAjx4tfPFxgi2ZcTZYlGlM4Q',
          },
        ],
      },
    ],
  },
  {
    id: 'monster',
    title: 'Monster',
    year: 2004,
    format: 'TV',
    seasonsCount: 1,
    totalEpisodes: 74,
    rating: 9.0,
    genres: ['Psychological', 'Thriller', 'Mystery'],
    popular: true,
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5QZEOQ8xu911a5Jc2MxILAFO2eHfVC2AGCrj5xAZnOZ7hO9PeLnVrXhwizodBZiVHp5NkuXWY3WJRB4GKF--yKckLenpcTtGIBc1eS0ICAkdX0A9eRSGs6vWme5kmk-_jI3Dhz0ZIB15HQhGm3AbMl4t1UETbXSPRuk6Ui7RpqCqnG2pdpBtMAV9PH0ytPML324_6TS0MVp7cNmnGmJSrkV1i58IXto_T36fUcqqLKvOsyCG-bHHZUw',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5QZEOQ8xu911a5Jc2MxILAFO2eHfVC2AGCrj5xAZnOZ7hO9PeLnVrXhwizodBZiVHp5NkuXWY3WJRB4GKF--yKckLenpcTtGIBc1eS0ICAkdX0A9eRSGs6vWme5kmk-_jI3Dhz0ZIB15HQhGm3AbMl4t1UETbXSPRuk6Ui7RpqCqnG2pdpBtMAV9PH0ytPML324_6TS0MVp7cNmnGmJSrkV1i58IXto_T36fUcqqLKvOsyCG-bHHZUw',
    synopsis:
      'Dr. Kenzo Tenma, a brilliant Japanese neurosurgeon working in Germany, risks his career and moral compass to save a young boy with a gunshot wound to the head, unaware of the monster he has saved.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Complete Series',
        episodes: [
          {
            id: 'mon-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Herr Dr. Tenma',
            duration: '24 min',
            synopsis:
              'Dr. Tenma makes a fateful ethical decision in the operating room of Eisler Memorial Hospital.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuB5QZEOQ8xu911a5Jc2MxILAFO2eHfVC2AGCrj5xAZnOZ7hO9PeLnVrXhwizodBZiVHp5NkuXWY3WJRB4GKF--yKckLenpcTtGIBc1eS0ICAkdX0A9eRSGs6vWme5kmk-_jI3Dhz0ZIB15HQhGm3AbMl4t1UETbXSPRuk6Ui7RpqCqnG2pdpBtMAV9PH0ytPML324_6TS0MVp7cNmnGmJSrkV1i58IXto_T36fUcqqLKvOsyCG-bHHZUw',
          },
        ],
      },
    ],
  },
  {
    id: 'your-name',
    title: 'Your Name',
    originalTitle: 'Kimi no Na wa',
    year: 2016,
    format: 'Movie',
    seasonsCount: 1,
    totalEpisodes: 1,
    rating: 8.9,
    genres: ['Romance', 'Drama', 'Supernatural'],
    popular: true,
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuyJ5kysejIyFqtbc6m66VOBy_hrcTGXUQgx_qGcfgK3t_0BnQFsUUDxBH56TWuKF5HfcYhTj13UVgZ-fxKpmXEfXK4PAp1Lo8sTX2tePzZD6INCqL5ogOod3LXXtQJRAo4tZ9eeZvcNu0o2o3g03e784t5BuNCq4erO0jWATPIGiRZIbbl_A1TTgtMOgiebkrmf1RB17bxpUiAtO3asJzNfZRRSg3COcBxSe8t25Gtbw8qiWzq3NdmQ',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuyJ5kysejIyFqtbc6m66VOBy_hrcTGXUQgx_qGcfgK3t_0BnQFsUUDxBH56TWuKF5HfcYhTj13UVgZ-fxKpmXEfXK4PAp1Lo8sTX2tePzZD6INCqL5ogOod3LXXtQJRAo4tZ9eeZvcNu0o2o3g03e784t5BuNCq4erO0jWATPIGiRZIbbl_A1TTgtMOgiebkrmf1RB17bxpUiAtO3asJzNfZRRSg3COcBxSe8t25Gtbw8qiWzq3NdmQ',
    synopsis:
      'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Film',
        episodes: [
          {
            id: 'yn-movie',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Full Movie',
            duration: '106 min',
            synopsis:
              'Mitsuha and Taki communicate through notes written on their arms as a once-in-a-millennium comet nears Earth.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDuyJ5kysejIyFqtbc6m66VOBy_hrcTGXUQgx_qGcfgK3t_0BnQFsUUDxBH56TWuKF5HfcYhTj13UVgZ-fxKpmXEfXK4PAp1Lo8sTX2tePzZD6INCqL5ogOod3LXXtQJRAo4tZ9eeZvcNu0o2o3g03e784t5BuNCq4erO0jWATPIGiRZIbbl_A1TTgtMOgiebkrmf1RB17bxpUiAtO3asJzNfZRRSg3COcBxSe8t25Gtbw8qiWzq3NdmQ',
          },
        ],
      },
    ],
  },
  {
    id: 'cowboy-bebop',
    title: 'Cowboy Bebop',
    year: 1998,
    format: 'TV',
    seasonsCount: 1,
    totalEpisodes: 26,
    rating: 8.9,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    popular: true,
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDle9hsn6RzZzSp-ZM-0lY8wSn9-hTb0QIOC5Piv5uOofo8xVyBZJhDWsTvEbJInbaOnvKMnlBV5x_j3loKgwzzv-y8VKNFtdfLvrCN-Q5aSqN8FzLxYsjRldQlSWfsGszN8ENTHfblY2RJvcWtY19jPWMOaP2DS-1IilL8TslqOcEpeiqGgP7zDnl0ceBxRUWg958-tD5wXHJ3IdKxCaMrx6MI4oDoNs0MJKC0v1P08GjZLcV20jY7SQ',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDle9hsn6RzZzSp-ZM-0lY8wSn9-hTb0QIOC5Piv5uOofo8xVyBZJhDWsTvEbJInbaOnvKMnlBV5x_j3loKgwzzv-y8VKNFtdfLvrCN-Q5aSqN8FzLxYsjRldQlSWfsGszN8ENTHfblY2RJvcWtY19jPWMOaP2DS-1IilL8TslqOcEpeiqGgP7zDnl0ceBxRUWg958-tD5wXHJ3IdKxCaMrx6MI4oDoNs0MJKC0v1P08GjZLcV20jY7SQ',
    synopsis:
      'The easygoing bounty hunter Spike Spiegel and his partner Jet Black cruise the solar system aboard the Bebop ship in search of high-value criminals.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Session 1',
        episodes: [
          {
            id: 'cb-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Asteroid Blues',
            duration: '24 min',
            synopsis:
              'Spike and Jet chase an eye-drop drug syndicate fugitive on Asteroid Tijuana.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDle9hsn6RzZzSp-ZM-0lY8wSn9-hTb0QIOC5Piv5uOofo8xVyBZJhDWsTvEbJInbaOnvKMnlBV5x_j3loKgwzzv-y8VKNFtdfLvrCN-Q5aSqN8FzLxYsjRldQlSWfsGszN8ENTHfblY2RJvcWtY19jPWMOaP2DS-1IilL8TslqOcEpeiqGgP7zDnl0ceBxRUWg958-tD5wXHJ3IdKxCaMrx6MI4oDoNs0MJKC0v1P08GjZLcV20jY7SQ',
          },
        ],
      },
    ],
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    year: 2024,
    format: 'TV',
    seasonsCount: 2,
    totalEpisodes: 24,
    rating: 8.8,
    genres: ['Action', 'Fantasy', 'Adventure'],
    popular: true,
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDglRM39GWFvIOTpAlyEzadhltXHUrROrfyAjjXbcFaVlIXlPheLqM65DdBk9PNC_UTKea0QpUY2zlEW8gG7-hHQ-P-Y5ohlLoWXps6WLT-adug1BtZg8v1sy1X8jim1xJia1Yn0YM_rYl3JCep1SCxfps93_MlY7gOODsSE5cqWpyR50M94303o1xa2w1viorO60ZF1d7QotQISkBjus1efRqepkA3g5Zmo2FcQiewPhw7QWYeK8E3Hg',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDglRM39GWFvIOTpAlyEzadhltXHUrROrfyAjjXbcFaVlIXlPheLqM65DdBk9PNC_UTKea0QpUY2zlEW8gG7-hHQ-P-Y5ohlLoWXps6WLT-adug1BtZg8v1sy1X8jim1xJia1Yn0YM_rYl3JCep1SCxfps93_MlY7gOODsSE5cqWpyR50M94303o1xa2w1viorO60ZF1d7QotQISkBjus1efRqepkA3g5Zmo2FcQiewPhw7QWYeK8E3Hg',
    synopsis:
      'In a world where hunters must battle deadly monsters, the weakest hunter Sung Jinwoo is brutally slaughtered in a double dungeon, only to be resurrected with a mysterious leveling interface.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'sl-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. I\'m Used to It',
            duration: '24 min',
            synopsis:
              'E-Rank Hunter Sung Jinwoo enters a D-Rank dungeon with his party, stumbling upon a hidden subterranean temple.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDglRM39GWFvIOTpAlyEzadhltXHUrROrfyAjjXbcFaVlIXlPheLqM65DdBk9PNC_UTKea0QpUY2zlEW8gG7-hHQ-P-Y5ohlLoWXps6WLT-adug1BtZg8v1sy1X8jim1xJia1Yn0YM_rYl3JCep1SCxfps93_MlY7gOODsSE5cqWpyR50M94303o1xa2w1viorO60ZF1d7QotQISkBjus1efRqepkA3g5Zmo2FcQiewPhw7QWYeK8E3Hg',
          },
        ],
      },
    ],
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    year: 2022,
    format: 'TV',
    seasonsCount: 2,
    totalEpisodes: 37,
    rating: 8.6,
    genres: ['Comedy', 'Action', 'Slice of Life'],
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9k5gJvk0URbKbMxocB7oxP2vXqq4Gkd47IXap8-wokGE2D9PNHSsBv7Jg4Fu53ub-aXIiPNEJixK4-XmqJr9X91EksfZjuDeJNMTrMF8bSS6_tAIp3KIAQ51wNKO7dRK3cRedgFXiOCHrFwZ-AK55elCF8O2g7TdIrTnhsXqAgz4W-CXWslivha_lGpjjFOOeyCCFVfe38cqNW9u4uM_MEPGi-8lZJ2lG_JOr_Oo4GQokYn2Tw87reA',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9k5gJvk0URbKbMxocB7oxP2vXqq4Gkd47IXap8-wokGE2D9PNHSsBv7Jg4Fu53ub-aXIiPNEJixK4-XmqJr9X91EksfZjuDeJNMTrMF8bSS6_tAIp3KIAQ51wNKO7dRK3cRedgFXiOCHrFwZ-AK55elCF8O2g7TdIrTnhsXqAgz4W-CXWslivha_lGpjjFOOeyCCFVfe38cqNW9u4uM_MEPGi-8lZJ2lG_JOr_Oo4GQokYn2Tw87reA',
    synopsis:
      'A spy on an undercover mission gets married and adopts a telepathic child as part of his cover. His wife is an assassin and nobody knows each other\'s secrets except the daughter.',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'sxf-s1-e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Operation Strix',
            duration: '24 min',
            synopsis:
              'Master spy Twilight creates a fake identity as psychiatrist Loid Forger and adopts Anya from an orphanage.',
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuD9k5gJvk0URbKbMxocB7oxP2vXqq4Gkd47IXap8-wokGE2D9PNHSsBv7Jg4Fu53ub-aXIiPNEJixK4-XmqJr9X91EksfZjuDeJNMTrMF8bSS6_tAIp3KIAQ51wNKO7dRK3cRedgFXiOCHrFwZ-AK55elCF8O2g7TdIrTnhsXqAgz4W-CXWslivha_lGpjjFOOeyCCFVfe38cqNW9u4uM_MEPGi-8lZJ2lG_JOr_Oo4GQokYn2Tw87reA',
          },
        ],
      },
    ],
  },
];

export const INITIAL_CONTINUE_WATCHING: WatchHistoryItem[] = [
  {
    animeId: 'demon-slayer',
    animeTitle: 'Demon Slayer',
    episodeId: 'ds-s2-e7',
    episodeTitle: 'Transformation',
    seasonNumber: 2,
    episodeNumber: 7,
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpoQzkUr3n5cE4Bj-Tx9OCs4-JpHR9caLrZJ-T6CwjY26vos_Ymds-6oLhv5NyiCngQCEIC8AjK0IomdVtx70R3OJz2J8DLTiJG2YJaBBrqn0Um21-LR078eiSd8NEv5s-QHZf1zwr3AS2S6-unhPDaFYCUzUgvygoT0YEhF3hVEj_sVY5bXt_Xl5e6-CfClc4GGRUtrXlsgNwXo4iA1JhM6AfxbFoxQHHh0QLJst_ikjTJl4Qo5MA3Q',
    progressPercent: 68,
    timeLeft: '12m left',
    lastWatched: '2 hours ago',
  },
  {
    animeId: 'attack-on-titan',
    animeTitle: 'Attack on Titan',
    episodeId: 'aot-s4-e12',
    episodeTitle: 'Memories of the Future',
    seasonNumber: 4,
    episodeNumber: 12,
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqqDkerjPjVYfuJyATd-Nb2ZRSuY0lLnL6z2VLYUITiey3tAdzktuD-U8nYzA9x8rpBcHE5VI7x0cRVbfeC6ZHE7IOroG3meCxP4HwoM6imgB2k_tRISxhzRF3lF7mvx7ryImgNZAj5sP36DRRc87opaTh4_qUQCj_6o7HJEQZIjJsjic3GNHg5HNN3WX7Jn5QNtKRthuEIjxY8yToon7eSpajEG3C_YR5Id7JpX3COBPnz645OPLrOg',
    progressPercent: 45,
    timeLeft: '13m left',
    lastWatched: 'Yesterday',
  },
  {
    animeId: 'solo-leveling',
    animeTitle: 'Solo Leveling',
    episodeId: 'sl-s1-e1',
    episodeTitle: "I'm Used to It",
    seasonNumber: 1,
    episodeNumber: 1,
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDglRM39GWFvIOTpAlyEzadhltXHUrROrfyAjjXbcFaVlIXlPheLqM65DdBk9PNC_UTKea0QpUY2zlEW8gG7-hHQ-P-Y5ohlLoWXps6WLT-adug1BtZg8v1sy1X8jim1xJia1Yn0YM_rYl3JCep1SCxfps93_MlY7gOODsSE5cqWpyR50M94303o1xa2w1viorO60ZF1d7QotQISkBjus1efRqepkA3g5Zmo2FcQiewPhw7QWYeK8E3Hg',
    progressPercent: 20,
    timeLeft: '19m left',
    lastWatched: '3 days ago',
  },
];
