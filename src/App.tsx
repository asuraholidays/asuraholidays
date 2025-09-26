import { useEffect, useMemo, useState, useContext } from 'react'
import { Link, Routes, Route, useLocation, useParams, useSearchParams, Navigate } from 'react-router-dom'
import { PACKAGES, type PackageCategory } from './data/packages'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Rating,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Divider,
  Drawer,
  Tabs,
  Tab,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneIcon from '@mui/icons-material/Phone'
import InfoIcon from '@mui/icons-material/Info'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShieldIcon from '@mui/icons-material/Shield'
import PaymentsIcon from '@mui/icons-material/Payments'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { ColorModeContext } from './theme'

// Local images served from public/img
const IMG = {
  hero: '/img/gallery1.jpg',
  gallery: [
    { src: '/img/gallery1.jpg', alt: 'Santorini' },
    { src: '/img/gallery2.jpg', alt: 'Tokyo' },
    { src: '/img/gallery3.jpg', alt: 'Dubai' },
    { src: '/img/gallery4.jpg', alt: 'Bali' },
    { src: '/img/gallery5.jpg', alt: 'Swiss Alps' },
  ],
  packages: {
    goa: ['/img/goa1.jpg','/img/goa2.jpg','/img/goa3.jpg','/img/goa4.jpg'],
    kerala: ['/img/kerala1.jpg','/img/kerala2.jpg','/img/kerala3.jpg','/img/kerala4.jpg'],
    karnataka: ['/img/karnataka1.jpg','/img/karnataka2.jpg','/img/karnataka3.jpg','/img/karnataka4.jpg'],
    andaman: ['/img/andaman1.jpg','/img/andaman2.jpg','/img/andaman3.jpg','/img/andaman4.jpg'],
    singapore: ['/img/singapore1.jpg','/img/singapore2.jpg','/img/singapore3.jpg','/img/singapore4.jpg'],
    thailand: ['/img/thailand1.jpg','/img/thailand2.jpg','/img/thailand3.jpg','/img/thailand4.jpg'],
  },
  fallback: '/img/fallback.jpg',
}

// Simple SEO helper without external libs + JSON-LD support
function Seo({ title, description, jsonLd, og }: { title: string; description?: string; jsonLd?: object | object[]; og?: { title?: string; description?: string; image?: string } }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
    // inject Open Graph
    const ensureMeta = (property: string, content: string) => {
      let m = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null
      if (!m) { m = document.createElement('meta'); m.setAttribute('property', property); document.head.appendChild(m) }
      m.setAttribute('content', content)
      return m
    }
    const ogAdded: HTMLMetaElement[] = []
    if (og?.title) ogAdded.push(ensureMeta('og:title', og.title))
    if (og?.description) ogAdded.push(ensureMeta('og:description', og.description))
    if (og?.image) ogAdded.push(ensureMeta('og:image', og.image))

    // inject JSON-LD
    let addedScripts: HTMLScriptElement[] = []
    const blocks = Array.isArray(jsonLd) ? jsonLd : (jsonLd ? [jsonLd] : [])
    blocks.forEach((obj) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.textContent = JSON.stringify(obj)
      document.head.appendChild(s)
      addedScripts.push(s)
    })
    return () => {
      document.title = prevTitle
      // cleanup injected JSON-LD
      addedScripts.forEach(s => s.remove())
      ogAdded.forEach(m => m.remove())
    }
  }, [title, description, JSON.stringify(jsonLd), JSON.stringify(og)])
  return null
}

function encodeQuery(q: string) { return encodeURIComponent(q).replace(/%20/g, '+') }
function extractPhoneFromHref(href?: string | null) {
  if (!href) return '919363995171'
  const m = href.match(/(\d{10,15})/)
  return m ? m[1] : '919363995171'
}
function buildWaUrls(message: string) {
  const phone = extractPhoneFromHref('https://wa.me/919363995171')
  const text = encodeQuery(message)
  const waMe = `https://wa.me/${phone}?text=${text}`
  const apiUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`
  return { waMe, apiUrl }
}
function openWhatsApp(message: string) {
  const { waMe, apiUrl } = buildWaUrls(message)
  try {
    window.location.href = waMe
    setTimeout(() => { try { window.location.href = apiUrl } catch {} }, 800)
  } catch {
    window.open(apiUrl, '_blank', 'noopener')
  }
}

function Header() {
  const colorMode = useContext(ColorModeContext)
  const [elev, setElev] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setElev(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AppBar color="transparent" elevation={elev ? 4 : 0} sx={{ backdropFilter: 'blur(8px)' }}>
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Stack direction="row" alignItems="center" spacing={1} component={Link} to="/" sx={{ textDecoration: 'none' }}>
          <Box component="img" src="/img/hero.jpg" alt="Asura Holidays" sx={{ width: 28, height: 28, borderRadius: '6px', objectFit: 'cover' }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Asura <Box component="span" sx={{ color: 'primary.main' }}>Holidays</Box></Typography>
        </Stack>
        <Box sx={{ flex: 1 }} />
        <Stack direction={{ xs: 'row' }} spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/packages" color="inherit">Packages</Button>
          <Button component={Link} to="/reviews" color="inherit">Reviews</Button>
          <Button component={Link} to="/about" color="inherit">About</Button>
          <Button component={Link} to="/contact" color="inherit">Contact</Button>
        </Stack>
        <IconButton onClick={colorMode.toggle} color="inherit" sx={{ ml: 1 }} aria-label="Toggle color mode">
          {colorMode.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <IconButton sx={{ display: { xs: 'inline-flex', sm: 'none' } }} color="inherit" aria-label="Open navigation" onClick={()=>setMobileOpen(true)}>
          <MenuIcon/>
        </IconButton>
      </Toolbar>
      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={()=>setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="presentation" onClick={()=>setMobileOpen(false)}>
          <Stack spacing={1.2}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/packages" color="inherit">Packages</Button>
            <Button component={Link} to="/reviews" color="inherit">Reviews</Button>
            <Button component={Link} to="/about" color="inherit">About</Button>
            <Button component={Link} to="/contact" color="inherit">Contact</Button>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1}>
              <Button href="tel:+919363995171" variant="contained" color="secondary">Call</Button>
              <Button onClick={(e)=>{ e.preventDefault(); openWhatsApp('Hello Asura Holidays!') }} variant="contained" sx={{ bgcolor: '#25D366', color: '#0a0f1f', '&:hover': { bgcolor: '#1ebe57' } }}>WhatsApp</Button>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Button onClick={(e)=>{ e.preventDefault(); colorMode.toggle() }} variant="outlined" startIcon={colorMode.mode==='dark' ? <LightModeIcon/> : <DarkModeIcon/>}>
              {colorMode.mode==='dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  )
}

function TrustBadges() {
  const items = [
    { icon: <VerifiedIcon color="primary" />, title: 'Trusted by Travelers', text: 'Hundreds of happy trips planned' },
    { icon: <ShieldIcon color="secondary" />, title: 'Secure Bookings', text: 'Safe and transparent process' },
    { icon: <PaymentsIcon color="success" />, title: 'Best Price', text: 'Competitive and fair pricing' },
    { icon: <SupportAgentIcon color="warning" />, title: '24/7 Support', text: 'We are here when you need us' },
  ]
  return (
    <Box sx={{ py: { xs: 5, md: 7 } }}>
      <Container>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {items.map((it) => (
            <Paper key={it.title} elevation={6} sx={{ p: 2.5, borderRadius: 3, display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <Box sx={{ mt: 0.5 }}>{it.icon}</Box>
              <Box>
                <Typography fontWeight={800}>{it.title}</Typography>
                <Typography color="text.secondary" variant="body2">{it.text}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

function Faq() {
  const qas = [
    { q: 'Can I customize my package?', a: 'Yes. We tailor itineraries to your dates, group size, interests and budget.' },
    { q: 'Do you arrange flights?', a: 'Yes. We can include flights, hotels, transfers and activities as per your needs.' },
    { q: 'What is the payment process?', a: 'We follow a milestone-based, transparent payment schedule with secure options.' },
    { q: 'Is support available during the trip?', a: 'Absolutely. Our team provides 24/7 assistance throughout your journey.' },
  ]
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>Frequently Asked Questions</Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mb: 3 }}>Everything you need to know before booking</Typography>
        <Box>
          {qas.map((qa) => (
            <Accordion key={qa.q} sx={{ bgcolor: 'rgba(255,255,255,0.04)', mb: 1, borderRadius: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>{qa.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{qa.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

function Hero() {
  return (
    <Box id="home" sx={{
      minHeight: { xs: '74vh', md: '84vh' },
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      position: 'relative',
      px: 2,
      overflow: 'hidden',
      backgroundImage: `url(${IMG.hero})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 55%'
    }}>
      {/* Overlay */}
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.25))' }} />
      {/* Decorative gradient blobs */}
      <Box sx={{ position: 'absolute', width: 280, height: 280, top: -60, left: -60, borderRadius: '50%', filter: 'blur(60px)', background: 'radial-gradient(closest-side, rgba(255,107,107,0.45), transparent)' }} />
      <Box sx={{ position: 'absolute', width: 320, height: 320, bottom: -80, right: -80, borderRadius: '50%', filter: 'blur(70px)', background: 'radial-gradient(closest-side, rgba(77,171,247,0.35), transparent)' }} />
      <Container sx={{ position: 'relative' }}>
        {/* Category chips */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2, flexWrap: 'wrap' }}>
          {['Domestic','Family','Adventure','Group'].map(l => (<Chip key={l} label={l} color="secondary" variant="outlined" />))}
        </Stack>
        <Typography variant="h2" fontWeight={800} gutterBottom>Discover Your Next Adventure</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, mx: 'auto', mb: 2 }}>
          Unbeatable holiday packages across India. Curated tours, trusted stays, and 24/7 assistance.
        </Typography>
        {/* Rating badge */}
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
          <Rating value={4.9} precision={0.1} readOnly />
          <Typography color="text.secondary">4.9/5 rated by 50+ travelers</Typography>
        </Stack>
        {/* CTAs */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button href="#packages" size="large" variant="contained" color="primary">Explore Packages</Button>
          <Button size="large" variant="outlined" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp('Hi Asura Holidays, help me plan a trip!')}>
            Plan on WhatsApp
          </Button>
        </Stack>
      </Container>
      {/* Bottom wave */}
      <Box aria-hidden sx={{ position: 'absolute', left: 0, right: 0, bottom: -1 }}>
        <svg width="100%" height="64" viewBox="0 0 1440 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,16 1440,32 L1440,64 L0,64 Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </Box>
    </Box>
  )
}

function useRotating(srcs: string[], delayMs = 3000) {
  const [idx, setIdx] = useState(0)
  const safe = useMemo(() => (srcs?.length ? srcs : [IMG.fallback]), [srcs])
  useEffect(() => {
    if (safe.length < 2) return
    const id = setInterval(() => setIdx(i => (i + 1) % safe.length), delayMs)
    return () => clearInterval(id)
  }, [safe, delayMs])
  return safe[idx]
}

function PackageCard({ title, price, desc, images, slug, onDetails, badge }: { title: string; price: string; desc: string; images: string[]; slug?: string; onDetails: () => void; badge?: string }) {
  const src = useRotating(images)
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 6 }}>
      <Box sx={{ position: 'relative' }}>
        <Box component="img" src={src} alt={title} loading="lazy" sx={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} onError={(e:any)=>{ e.currentTarget.src = IMG.fallback }} />
        <Box sx={{ position: 'absolute', bottom: 12, left: 12, bgcolor: 'warning.light', color: '#111827', fontWeight: 800, px: 1.5, py: 0.5, borderRadius: 6 }}>{price}</Box>
        {badge && (
          <Chip label={badge} color="secondary" size="small" sx={{ position: 'absolute', top: 12, left: 12 }} />
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography color="text.secondary">{desc}</Typography>
      </CardContent>
      <Box sx={{ flex: 1 }} />
      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        {slug ? (
          <Button fullWidth component={Link} to={`/packages/${slug}`} variant="outlined" startIcon={<InfoIcon/>}>Details</Button>
        ) : (
          <Button fullWidth variant="outlined" startIcon={<InfoIcon/>} onClick={onDetails}>Details</Button>
        )}
        <Button fullWidth variant="contained" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp(`Hello Asura Holidays, I would like to book: ${title}. Please share details.`)}>Book</Button>
      </CardActions>
    </Card>
  )
}

type PackageItem = { title: string; price: string; images: string[]; desc: string; slug?: string }

function Packages({ list }: { list?: PackageItem[] }) {
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState<PackageItem | null>(null)
  const defaultList: PackageItem[] = [
    { title: 'Goa Beach Escape', price: '₹ 13,999', images: IMG.packages.goa, desc: '6N/5D | Sun, sand, and serenity with curated beach activities, Water Sports Activity With Cruise Dinner.' },
    { title: 'Kerala', price: '₹3,000 to ₹15,000', images: IMG.packages.kerala, desc: 'Vagamon, Thekkady, Varkala, Thiruvananthapuram, Alleppey, Kochi, Munnar.' },
    { title: 'Karnataka', price: '₹4,000 to ₹20,000', images: IMG.packages.karnataka, desc: 'Bengaluru, Mysuru, Chikkamagaluru, Coorg, Dandeli, Udupi, Mangaluru, Gokarna.' },
    { title: 'Andaman', price: '₹10,000 to ₹30,000', images: IMG.packages.andaman, desc: '3N/2D | Places up to you' },
    { title: 'Singapore', price: '₹59,999', images: IMG.packages.singapore, desc: 'Futuristic skyline, theme parks, and city tours.' },
    { title: 'Thailand', price: '₹20,000 to ₹60,000', images: IMG.packages.thailand, desc: '4N/5D | Pattaya and Phuket.' },
  ]
  const data = list ?? defaultList
  return (
    <Box id="packages" component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>Featured Packages</Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mb: 4 }}>Hand-picked trips for every kind of traveler</Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}>
          {data.map((p) => (
            <Box key={p.title}>
              <PackageCard {...p} onDetails={() => { setSel(p); setOpen(true); }} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* Details Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{sel?.title}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 2 }}>
            <Box component="img" src={sel?.images?.[0]} alt={sel?.title} loading="lazy" sx={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 2 }} onError={(e:any)=>{ e.currentTarget.src = IMG.fallback }} />
            <Box>
              <Typography color="text.secondary" sx={{ mb: 1 }}>{sel?.desc}</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
                {['Flights','Hotels','Transfers','Breakfast','Guided Tours'].map(tag => (
                  <Chip key={tag} label={tag} color="secondary" variant="outlined" />
                ))}
              </Stack>
              <Typography fontWeight={800} sx={{ mb: 1 }}>{sel?.price}</Typography>
              <List dense>
                {['Flexible dates available','Customizable itinerary','24/7 Trip assistance','Best price guarantee'].map(i => (
                  <ListItem key={i}><ListItemText primary={i} /></ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<PhoneIcon/>} href="tel:+919363995171" variant="outlined">Call</Button>
          <Button startIcon={<WhatsAppIcon/>} variant="contained" onClick={() => openWhatsApp(`Hello Asura Holidays, I would like to know more about: ${sel?.title}`)}>WhatsApp</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

function Gallery() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % IMG.gallery.length), 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <Box id="gallery" component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>Destination Gallery</Typography>
        <Paper elevation={8} sx={{ overflow: 'hidden', borderRadius: 3, position: 'relative' }}>
          <Box sx={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '100%', transform: `translateX(-${idx * 100}%)`, transition: 'transform 600ms ease' }}>
            {IMG.gallery.map(g => (
              <Box key={g.src} sx={{ height: { xs: 240, sm: 340, md: 420 } }}>
                <Box component="img" src={g.src} alt={g.alt} loading="lazy" onError={(e:any)=>{ e.currentTarget.src = IMG.fallback }} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
          <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}>
            {IMG.gallery.map((_, i) => (
              <Box key={i} onClick={() => setIdx(i)} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: i===idx ? 'primary.main' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

function About() {
  return (
    <Box id="about" component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
          gap: 3,
          alignItems: 'center',
        }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>Why Travel With Asura Holidays?</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              We craft memorable journeys that fit your budget and style. From family vacations to luxury getaways, our team ensures a seamless experience—flights, stays, transfers, and activities—all taken care of.
            </Typography>
            <Stack component="ul" spacing={1} sx={{ listStyle: 'none', pl: 0, m: 0 }}>
              {['Expert Itineraries & Local Guides','Epic Destinations','Trusted by Thousands','Best Price Guarantee','24/7 Trip Assistance','Customizable Packages'].map(it => (
                <Box key={it} component="li">✅ {it}</Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {[{label:'Happy Travelers',num:'50+'},{label:'Destinations',num:'100+'},{label:'Experience',num:'2+ yrs'}].map(s => (
                <Paper key={s.label} elevation={6} sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                  <Typography variant="h5" fontWeight={800}>{s.num}</Typography>
                  <Typography color="text.secondary" variant="body2">{s.label}</Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

function Contact() {
  return (
    <Box id="contact" component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>Contact Us</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>We'd love to plan your next holiday</Typography>
          <Stack spacing={1}>
            <Typography><strong>Asura Holidays</strong></Typography>
            <Typography><strong>Contact Person:</strong> Yeswanth</Typography>
            <Typography>
              <strong>Mobile:</strong> <Box component="a" href="https://wa.me/919363995171" target="_blank" rel="noopener" sx={{ color: 'secondary.main' }}>+91 93639 95171</Box>
            </Typography>
            <Typography>
              <strong>Email:</strong> <Box component="a" href="mailto:asuraholidays123@gmail.com" sx={{ color: 'secondary.main' }}>asuraholidays123@gmail.com</Box>
            </Typography>
            <Typography>
              <strong>Instagram:</strong> <Box component="a" href="https://instagram.com/asura_holidays_official_" target="_blank" rel="noopener" sx={{ color: 'secondary.main', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}><InstagramIcon fontSize="small"/> @asura_holidays_official_</Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp('Hello Asura Holidays, I am interested in your packages. Please share details.')}>Chat on WhatsApp</Button>
            <Button variant="outlined" href="#packages">See Packages</Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

function Footer() {
  const phone = '+91 93639 95171'
  const phoneHref = 'tel:+919363995171'
  const igUser = 'asura_holidays_official_'
  const igUrl = `https://instagram.com/${igUser}`
  const waUrl = 'https://wa.me/919363995171'

  return (
    <Box component="footer" sx={{ mt: 6, bgcolor: 'background.paper', borderTop: (t) => `1px solid ${t.palette.divider}` }}>
      {/* Top content */}
      <Container sx={{ py: 4 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr' },
          gap: { xs: 3, md: 4 },
        }}>
          {/* Brand */}
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Box component="img" src="/hero.jpg" alt="Asura Holidays" sx={{ width: 44, height: 44, borderRadius: 2, objectFit: 'cover', boxShadow: 4 }} />
              <Typography variant="h6" fontWeight={800}>Asura <Box component="span" sx={{ color: 'primary.main' }}>Holidays</Box></Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
              Your trusted trip planner for unforgettable adventures. We curate, you explore — with comfort and style.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>Quick Links</Typography>
            <Stack spacing={1.0}>
              <Box component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'common.white' } }}>Home</Box>
              <Box component={Link} to="/packages" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'common.white' } }}>Packages</Box>
              <Box component={Link} to="/reviews" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'common.white' } }}>Reviews</Box>
              <Box component={Link} to="/contact" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'common.white' } }}>Contact</Box>
            </Stack>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>Contact</Typography>
            <Stack spacing={1.0}>
              <Typography color="text.secondary">Phone: <Box component="a" href={phoneHref} sx={{ color: 'secondary.main' }}>{phone}</Box></Typography>
              <Typography color="text.secondary">Email: <Box component="a" href="mailto:asuraholidays123@gmail.com" sx={{ color: 'secondary.main' }}>asuraholidays123@gmail.com</Box></Typography>
              <Typography color="text.secondary">WhatsApp: <Box component="a" href={waUrl} target="_blank" rel="noopener" sx={{ color: 'secondary.main' }}>Chat on WhatsApp</Box></Typography>
              <Typography color="text.secondary">Instagram: <Box component="a" href={igUrl} target="_blank" rel="noopener" sx={{ color: 'secondary.main' }}>@{igUser}</Box></Typography>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Bottom bar with actions */}
      <Box sx={{ borderTop: (t) => `1px solid ${t.palette.divider}` }}>
        <Container sx={{ position: 'relative', py: 2 }}>
          <Typography color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'center' }, pr: { md: 10 } }}>
            © Asura Holidays 2025. All rights reserved.
          </Typography>

          {/* Call Now - left */}
          <Box sx={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)' }}>
            <Button href={phoneHref} variant="contained" color="secondary" sx={{ borderRadius: 999, boxShadow: 6 }}>
              Call Now
            </Button>
          </Box>

          {/* WhatsApp - right */}
          <Box sx={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)' }}>
            <Button href={waUrl} target="_blank" rel="noopener" variant="contained" sx={{ bgcolor: '#25D366', color: '#0a0f1f', borderRadius: 999, px: 2.5, boxShadow: 6, '&:hover': { bgcolor: '#1ebe57' } }}>
              WhatsApp
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function HomePage() {
  const { reviews } = useReviews()
  return (
    <>
      <Seo
        title="Asura Holidays | Home"
        description="Holiday packages, curated tours and 24/7 assistance"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Asura Holidays',
            url: window.location.origin,
            sameAs: ['https://instagram.com/asura_holidays_official_'],
            contactPoint: [{ '@type': 'ContactPoint', telephone: '+91-9363995171', contactType: 'customer service' }]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Can I customize my package?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We tailor itineraries to your dates, group size, interests and budget.' } },
              { '@type': 'Question', name: 'Do you arrange flights?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We can include flights, hotels, transfers and activities as per your needs.' } },
              { '@type': 'Question', name: 'What is the payment process?', acceptedAnswer: { '@type': 'Answer', text: 'We follow a milestone-based, transparent payment schedule with secure options.' } },
              { '@type': 'Question', name: 'Is support available during the trip?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Our team provides 24/7 assistance throughout your journey.' } }
            ]
          }
        ]}
      />
      <Hero />
      {(() => {
        const domestic = PACKAGES.filter(p => p.category === 'Domestic')
        const mapped = domestic.slice(0, 3).map(p => ({
          title: p.title,
          desc: p.desc,
          images: p.images,
          price: p.priceMax ? `₹${p.priceMin.toLocaleString()} - ₹${p.priceMax.toLocaleString()}` : `₹ ${p.priceMin.toLocaleString()}`,
          slug: p.slug,
        }))
        return (
          <>
            <Packages list={mapped} />
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: -2 }}>
              <Button component={Link} to="/packages?cat=Domestic" variant="outlined">View all packages</Button>
            </Container>
          </>
        )
      })()}
      <CtaBanner />
      <TrustBadges />
      <Faq />
      <Reviews limit={2} data={reviews} />
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: -2 }}>
        <Button component={Link} to="/reviews" variant="outlined">See all reviews</Button>
      </Container>
      <Gallery />
      <About />
    </>
  )
}

//

function PackagesPage() {
  const [search, setSearch] = useSearchParams()
  const [q, setQ] = useState(search.get('q') ?? '')
  const [price, setPrice] = useState<'all'|'low'|'mid'|'high'>((search.get('price') as any) ?? 'all')
  const [cat, setCat] = useState<'all'|PackageCategory>((search.get('cat') as any) ?? 'Domestic')
  const [page, setPage] = useState(Number(search.get('page') ?? 1))
  const pageSize = 6
  const all = PACKAGES
  const filteredRaw = all.filter(p => (
    p.title.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase())
  )).filter(p => (cat==='all' ? true : p.category === cat)).filter(p => {
    const val = p.priceMin
    if (price==='low') return val < 15000
    if (price==='mid') return val >= 15000 && val < 40000
    if (price==='high') return val >= 40000
    return true
  })
  const totalPages = Math.max(1, Math.ceil(filteredRaw.length / pageSize))
  const start = (page - 1) * pageSize
  const sorted = [...filteredRaw]
  // sort by Popular (popular first), price asc/desc
  // read from query ?sort=popular|price_asc|price_desc
  const sort = (search.get('sort') || 'popular') as 'popular'|'price_asc'|'price_desc'
  if (sort==='popular') sorted.sort((a,b)=> (Number(b.popular||0) - Number(a.popular||0)))
  if (sort==='price_asc') sorted.sort((a,b)=> a.priceMin - b.priceMin)
  if (sort==='price_desc') sorted.sort((a,b)=> b.priceMin - a.priceMin)
  const current = sorted.slice(start, start + pageSize).map(p => ({
    title: p.title,
    desc: p.desc,
    images: p.images,
    price: p.priceMax ? `₹${p.priceMin.toLocaleString()} - ₹${p.priceMax.toLocaleString()}` : `₹ ${p.priceMin.toLocaleString()}`,
    slug: p.slug,
    badge: p.popular ? 'Popular' : (p.priceMin < 15000 ? 'Budget' : undefined),
  }))
  useEffect(()=>{ setPage(1) }, [q, price, cat])
  useEffect(()=>{
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (price !== 'all') params.set('price', price)
    params.set('cat', cat)
    if (page > 1) params.set('page', String(page))
    setSearch(params, { replace: true })
  }, [q, price, cat, page, setSearch])
  const offerCatalogLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Asura Holidays Packages',
    itemListElement: filteredRaw.map(p => ({
      '@type': 'Offer',
      name: p.title,
      category: p.category,
      price: p.priceMin,
      priceCurrency: 'INR',
    }))
  }
  return (
    <>
      <Seo title="Asura Holidays | Packages" description="Explore our curated holiday packages" jsonLd={offerCatalogLd} />
      <CtaBanner />
      <Container sx={{ mb: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: 2 }}>
          {/* Sidebar */}
          <Paper elevation={6} sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight={800} sx={{ mb: 1 }}>Categories</Typography>
            <Stack spacing={0.5}>
              {(['all','Domestic','International'] as const).map(c => (
                <Button key={c} variant={cat===c ? 'contained' : 'text'} size="small" onClick={()=>setCat(c as any)} sx={{ justifyContent: 'space-between' }}>
                  <span>{c}</span>
                  <Box component="span" sx={{ opacity: 0.7 }}>{c==='all' ? all.length : all.filter(p=>p.category===c).length}</Box>
                </Button>
              ))}
            </Stack>
            <Divider sx={{ my: 1.5 }} />
            <Typography fontWeight={800} sx={{ mb: 1 }}>Search</Typography>
            <TextField fullWidth placeholder="Search packages" value={q} onChange={e=>setQ(e.target.value)} />
            <Divider sx={{ my: 1.5 }} />
            <Typography fontWeight={800} sx={{ mb: 1 }}>Price</Typography>
            <FormControl fullWidth>
              <InputLabel id="priceLbl">Price</InputLabel>
              <Select labelId="priceLbl" value={price} label="Price" onChange={(e)=>setPrice(e.target.value as any)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="low">Under ₹15k</MenuItem>
                <MenuItem value="mid">₹15k - ₹40k</MenuItem>
                <MenuItem value="high">Above ₹40k</MenuItem>
              </Select>
            </FormControl>
            <Divider sx={{ my: 1.5 }} />
            <Typography fontWeight={800} sx={{ mb: 1 }}>Sort</Typography>
            <FormControl fullWidth>
              <InputLabel id="sortLbl">Sort by</InputLabel>
              <Select labelId="sortLbl" value={sort} label="Sort by" onChange={(e)=>setSearch(prev=>{ const p=new URLSearchParams(prev); p.set('sort', e.target.value as string); return p }, { replace: true })}>
                <MenuItem value="popular">Popular</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
            <Divider sx={{ my: 1.5 }} />
            <Typography fontWeight={800} sx={{ mb: 1 }}>Tags</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {['Beach','Mountain','Nature','City','Family','Devotional','Group','Adventure','State Circuit','Budget','Popular'].map(t => (
                <Chip key={t} label={t} variant={q.toLowerCase()===t.toLowerCase()? 'filled':'outlined'} onClick={()=>setQ(t)} />
              ))}
            </Stack>
          </Paper>
          {/* Results */}
          <Box>
            <Packages list={current} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination color="primary" count={totalPages} page={page} onChange={(_, value)=>setPage(value)} shape="rounded" />
            </Box>
          </Box>
        </Box>
      </Container>
      <TrustBadges />
      <Faq />
    </>
  )
}

function ReviewsPage() {
  const { reviews, add } = useReviews()
  const [name, setName] = useState('')
  const [rating, setRating] = useState<number | null>(5)
  const [text, setText] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !rating || !text) return
    await add({ name, rating, text })
    setName(''); setRating(5); setText('')
  }
  return (
    <>
      <Seo title="Asura Holidays | Reviews" description="What our travelers say" />
      <Box component="section" sx={{ py: { xs: 5, md: 7 } }}>
        <Container maxWidth="sm">
          <Paper elevation={8} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={800} gutterBottom>Share your experience</Typography>
            <Box component="form" onSubmit={submit}>
              <Stack spacing={1.5}>
                <TextField label="Your name" value={name} onChange={e=>setName(e.target.value)} required fullWidth />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ minWidth: 72 }}>Rating</Typography>
                  <Rating value={rating} precision={0.5} onChange={(_, v)=>setRating(v)} />
                </Stack>
                <TextField label="Review" value={text} onChange={e=>setText(e.target.value)} required fullWidth multiline minRows={3} />
                <Stack direction="row" spacing={1}>
                  <Button type="submit" variant="contained">Submit Review</Button>
                  <Button variant="outlined" onClick={()=>{ setName(''); setRating(5); setText('') }}>Clear</Button>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Note: Reviews are saved globally when VITE_REVIEWS_API is configured. Otherwise, they persist in your browser.
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Reviews data={reviews} />
      <TrustBadges />
      <CtaBanner />
    </>
  )
}

function ContactPage() {
  const phone = '+91 93639 95171'
  const phoneHref = 'tel:+919363995171'
  const igUser = 'asura_holidays_official_'
  const igUrl = `https://instagram.com/${igUser}`
  const waUrl = 'https://wa.me/919363995171'
  return (
    <>
      <Seo title="Asura Holidays | Contact" description="Call, WhatsApp, or send us a message" />
      <Box component="section" sx={{ py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {/* Left: Contact Card */}
            <Paper elevation={8} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>Contact Us</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>We'd love to plan your next holiday</Typography>
              <Stack spacing={1}>
                <Typography><strong>Asura Holidays</strong></Typography>
                <Typography><strong>Contact Person:</strong> Yeswanth</Typography>
                <Typography>
                  <strong>Mobile:</strong> <Box component="a" href={waUrl} target="_blank" rel="noopener" sx={{ color: 'secondary.main' }}>{phone}</Box>
                </Typography>
                <Typography>
                  <strong>Email:</strong> <Box component="a" href="mailto:asuraholidays123@gmail.com" sx={{ color: 'secondary.main' }}>asuraholidays123@gmail.com</Box>
                </Typography>
                <Typography>
                  <strong>Instagram:</strong> <Box component="a" href={igUrl} target="_blank" rel="noopener" sx={{ color: 'secondary.main', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}><InstagramIcon fontSize="small"/> @{igUser}</Box>
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" color="primary" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp('Hello Asura Holidays, I am interested in your packages. Please share details.')}>Chat on WhatsApp</Button>
                <Button variant="outlined" href="#packages">See Packages</Button>
              </Stack>
            </Paper>

            {/* Right: Send a Message form */}
            <Paper elevation={8} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={800} gutterBottom>Send a Message</Typography>
              {(() => {
                const formId = (import.meta as any).env?.VITE_FORMSPREE_ID as string | undefined
                const action = formId ? `https://formspree.io/f/${formId}` : undefined
                return (
                  <Box component="form" method="POST" action={action} onSubmit={(e)=>{ if (!action) { e.preventDefault(); window.location.href = 'mailto:asuraholidays123@gmail.com' } }}>
                    <Stack spacing={1.5}>
                      <TextField name="name" label="Name" required fullWidth />
                      <TextField type="email" name="email" label="Email" required fullWidth />
                      <TextField name="message" label="Message" required fullWidth multiline minRows={4} />
                      <Stack direction="row" spacing={1}>
                        <Button type="submit" variant="contained">Send</Button>
                        <Button variant="outlined" href="mailto:asuraholidays123@gmail.com">Email Instead</Button>
                      </Stack>
                      {!action && (
                        <Typography variant="caption" color="text.secondary">
                          Tip: Set VITE_FORMSPREE_ID in .env to enable the contact form.
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                )
              })()}
            </Paper>
          </Box>
        </Container>
      </Box>
      <TrustBadges />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <Seo title="Asura Holidays | About" description="Who we are and what we do" />
      <About />
      <TrustBadges />
      <CtaBanner />
    </>
  )
}

export default function App() {
  return (
    <Box id="top" sx={{ minHeight: '100dvh', bgcolor: 'background.default', pb: { xs: 8, md: 0 } }}>
      <Header />
      <Toolbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:slug" element={<PackageDetailPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
      <StickyDock />
    </Box>
  )
}

function PackageDetailPage() {
  const { slug } = useParams()
  const pkg = PACKAGES.find(p => p.slug === slug)
  if (!pkg) return <Navigate to="/packages" replace />
  const offerLd = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: pkg.title,
    category: pkg.category,
    price: pkg.priceMin,
    priceCurrency: 'INR',
  }
  return (
    <>
      <Seo title={`Asura Holidays | ${pkg.title}`} description={pkg.desc} jsonLd={offerLd} og={{ title: pkg.title, description: pkg.desc, image: pkg.images?.[0] }} />
      <Box component="section" sx={{ py: { xs: 5, md: 7 }, pb: 10 }}>
        <Container>
          <Typography variant="h4" fontWeight={800} gutterBottom>{pkg.title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>{pkg.desc}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 2 }}>
            <Paper elevation={8} sx={{ p: 1.5, borderRadius: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
                {pkg.images.slice(0,4).map(src => (
                  <Box key={src} component="img" src={src} alt={pkg.title} loading="lazy" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1 }} />
                ))}
              </Box>
            </Paper>
            <Paper elevation={8} sx={{ p: 2, borderRadius: 3 }}>
              <Typography fontWeight={800} sx={{ mb: 1 }}>Starting from ₹{pkg.priceMin.toLocaleString()}</Typography>
              <List dense>
                {['Flexible dates available','Customizable itinerary','24/7 Trip assistance','Best price guarantee'].map(i => (
                  <ListItem key={i}><ListItemText primary={i} /></ListItem>
                ))}
              </List>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" startIcon={<PhoneIcon/>} href="tel:+919363995171">Call</Button>
                <Button variant="contained" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp(`Interested in ${pkg.title}. Please share details.`)}>WhatsApp</Button>
              </Stack>
            </Paper>
          </Box>

          {/* Tabs for details */}
          <Box sx={{ mt: 2 }}>
            <Tabs value={0} variant="scrollable" scrollButtons="auto">
              <Tab label="Overview" />
              <Tab label="Inclusions" />
              <Tab label="Exclusions" />
              <Tab label="Itinerary" />
              <Tab label="FAQs" />
            </Tabs>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ mb: 1 }}><strong>Duration:</strong> {pkg.duration || 'As per plan'}</Typography>
              <Typography sx={{ mb: 1 }}><strong>Location:</strong> {pkg.location || 'Multiple'}</Typography>
              {pkg.tags && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', my: 1 }}>
                  {pkg.tags.map(t => <Chip key={t} label={t} />)}
                </Stack>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Inclusions</Typography>
              <Stack component="ul" sx={{ pl: 3, mb: 2 }}>
                {(pkg.inclusions || ['Accommodation','Breakfast','Transfers']).map(i => <li key={i}>{i}</li>)}
              </Stack>
              <Typography variant="h6">Exclusions</Typography>
              <Stack component="ul" sx={{ pl: 3, mb: 2 }}>
                {(pkg.exclusions || ['Flights','Personal expenses']).map(i => <li key={i}>{i}</li>)}
              </Stack>
              <Typography variant="h6">Itinerary</Typography>
              <Stack component="ol" sx={{ pl: 3, mb: 2 }}>
                {(pkg.itinerary || ['Arrival','Sightseeing','Leisure','Departure']).map(i => <li key={i}>{i}</li>)}
              </Stack>
              <Typography variant="h6">FAQs</Typography>
              <Stack sx={{ mb: 2 }}>
                {(pkg.faqs || [{q:'Can I customize?', a:'Yes, we tailor to your dates and budget.'}]).map(f => (
                  <Box key={f.q}>
                    <Typography fontWeight={700}>{f.q}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>{f.a}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Sticky Book Now bar */}
      <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0, bgcolor: 'background.paper', borderTop: (t)=>`1px solid ${t.palette.divider}`, py: 1.5 }}>
        <Container sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ flex: 1 }}><strong>{pkg.title}</strong> — from ₹{pkg.priceMin.toLocaleString()}</Typography>
          <Button variant="outlined" startIcon={<PhoneIcon/>} href="tel:+919363995171">Call</Button>
          <Button variant="contained" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp(`Interested in ${pkg.title}. Please share details.`)}>Book Now</Button>
        </Container>
      </Box>
      <TrustBadges />
      <Faq />
    </>
  )
}

function CtaBanner() {
  return (
    <Box sx={{ py: { xs: 5, md: 7 } }}>
      <Container>
        <Paper elevation={10} sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(77,171,247,0.15))',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
            <Box>
              <Typography variant="h5" fontWeight={800}>Plan your trip with Asura Holidays</Typography>
              <Typography color="text.secondary">Curated packages, best prices, and 24/7 assistance. Let’s build your itinerary.</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<PhoneIcon/>} href="tel:+919363995171">Call Now</Button>
              <Button variant="contained" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp('Hello Asura Holidays, I would like to plan a trip.')}>Chat on WhatsApp</Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

type ReviewItem = { name: string; rating: number; text: string }

function loadReviewsFromStorage(): ReviewItem[] {
  try {
    const raw = localStorage.getItem('asura_reviews')
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveReviewsToStorage(items: ReviewItem[]) {
  try { localStorage.setItem('asura_reviews', JSON.stringify(items)) } catch {}
}

async function fetchReviewsFromApi(): Promise<ReviewItem[] | null> {
  try {
    const url = (import.meta as any).env?.VITE_REVIEWS_API as string | undefined
    if (!url) return null
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

async function postReviewToApi(item: ReviewItem): Promise<boolean> {
  try {
    const url = (import.meta as any).env?.VITE_REVIEWS_API as string | undefined
    if (!url) return false
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
    return res.ok
  } catch { return false }
}

function useReviews() {
  const defaults: ReviewItem[] = [
    { name: 'Akash', rating: 5, text: 'Fantastic Goa trip! Everything from hotel to water sports was seamless.' },
    { name: 'Priya', rating: 4.5, text: 'Kerala itinerary was well-curated. Loved the houseboat experience!' },
    { name: 'Rahul', rating: 5, text: 'Singapore tour was amazing, great guides and punctual transfers.' },
    { name: 'Meera', rating: 4.5, text: 'Thailand duo was perfectly timed, great hotels and transfers.' },
  ]
  const [all, setAll] = useState<ReviewItem[]>(() => [...defaults, ...loadReviewsFromStorage()])
  useEffect(() => {
    let mounted = true
    fetchReviewsFromApi().then(remote => {
      if (mounted && remote && Array.isArray(remote)) {
        // naive merge: append remote entries not in local by text+name
        const key = (r: ReviewItem) => `${r.name}|${r.text}`
        const seen = new Set(all.map(key))
        const merged = [...all]
        remote.forEach(r => { if (!seen.has(key(r))) merged.push(r) })
        setAll(merged)
      }
    })
    return () => { mounted = false }
  }, [])
  useEffect(() => { saveReviewsToStorage(all.filter((_, i) => i >= defaults.length)) }, [all])
  const add = async (r: ReviewItem) => {
    setAll(prev => [r, ...prev])
    await postReviewToApi(r)
  }
  return { reviews: all, add }
}

function Reviews({ limit, data }: { limit?: number; data?: ReviewItem[] } = {}) {
  const source = data ?? [
    { name: 'Akash', rating: 5, text: 'Fantastic Goa trip! Everything from hotel to water sports was seamless.' },
    { name: 'Priya', rating: 4.5, text: 'Kerala itinerary was well-curated. Loved the houseboat experience!' },
    { name: 'Rahul', rating: 5, text: 'Singapore tour was amazing, great guides and punctual transfers.' },
    { name: 'Meera', rating: 4.5, text: 'Thailand duo was perfectly timed, great hotels and transfers.' },
  ]
  const visible = limit ? source.slice(0, limit) : source
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % visible.length), 3500)
    return () => clearInterval(id)
  }, [visible.length])
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>Traveler Reviews</Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mb: 4 }}>Real stories from our happy travelers</Typography>
        <Paper elevation={8} sx={{ overflow: 'hidden', borderRadius: 3, position: 'relative' }}>
          <Box sx={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '100%', transform: `translateX(-${idx * 100}%)`, transition: 'transform 600ms ease' }}>
            {visible.map((it) => (
              <Box key={it.name} sx={{ p: { xs: 2, md: 3 } }}>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', fontWeight: 800 }}>
                      {it.name[0]}
                    </Box>
                    <Typography fontWeight={700}>{it.name}</Typography>
                  </Stack>
                  <Rating value={it.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
                  <Typography color="text.secondary">{it.text}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
          <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}>
            {visible.map((_, i) => (
              <Box key={i} onClick={() => setIdx(i)} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: i===idx ? 'primary.main' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

function StickyDock() {
  return (
    <Box sx={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1200,
      display: { xs: 'block', md: 'none' },
      p: 1.2,
      bgcolor: 'rgba(11,17,32,0.9)',
      backdropFilter: 'blur(6px)',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
      <Container>
        <Stack direction="row" spacing={1.2}>
          <Button fullWidth variant="outlined" startIcon={<PhoneIcon/>} href="tel:+919363995171">Call</Button>
          <Button fullWidth variant="contained" startIcon={<WhatsAppIcon/>} onClick={() => openWhatsApp('Hello Asura Holidays, I need help with packages!')}>WhatsApp</Button>
        </Stack>
      </Container>
    </Box>
  )
}
