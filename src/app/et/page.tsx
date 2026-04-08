import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LiveCounter } from "@/components/live-counter"
import {
  ArrowRight,
  Shield,
  FileText,
  Scale,
  AlertTriangle,
  Gavel,
  Clock,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sinu CV lükkas tagasi AI. Nõua inimest.",
  description:
    "GDPR artikkel 22 annab sulle õiguse nõuda, et ühtegi täisautomaatset värbamisotsust vaataks üle inimene. Genereeri tasuta kiri, raporteeri ebaõiglasi värbamisi ja võrdle EL tööandjaid enne kui 2026. augustis lööb kogu jõuga sisse AI Act.",
}

export default function HomeEt() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-800 mb-6">
              <AlertTriangle className="h-3.5 w-3.5" />
              EL AI Act muudab värbamise AI &quot;kõrge riskiga&quot; 2. augustist 2026
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Sinu CV lükkas tagasi AI.
              <br />
              <span className="text-blue-600">Nüüd nõua inimest.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              GDPR artikkel 22 annab sulle juba praegu õiguse, et ühtegi
              täisautomaatset värbamisotsust vaataks üle päris inimene. Me
              aitame sul seda õigust kasutada — tasuta — ja avaldame, millised
              EL tööandjad päriselt ausalt sõelusid.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-base px-7 h-12">
                <Link href="/human-review">
                  <FileText className="mr-2 h-5 w-5" />
                  Genereeri minu art. 22 kiri
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-7 h-12">
                <Link href="/submit">
                  Jaga oma kandideerimise kogemust
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <LiveCounter />
          </div>
        </div>
      </section>

      {/* Paradox */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Paradoks, millest keegi ei räägi
            </h2>
            <p className="text-center text-slate-600 mb-12">
              Ettevõtted kasutavad AI-d, et sind sõeluda — aga lükkavad
              kandidatuuri tagasi, kui kahtlustavad, et <em>sina</em> kasutasid
              AI-d.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              <Card className="border-red-100">
                <CardContent className="pt-6">
                  <AlertTriangle className="h-8 w-8 text-red-500 mb-3" />
                  <h3 className="font-semibold mb-2">Sa lihvid CV-d AI-ga</h3>
                  <p className="text-sm text-slate-600">
                    Tõlge, grammatika, vorming. Täpselt samad tööriistad, mida
                    iga ettevõte ise sisemiselt kasutab.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-orange-100">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-orange-500 mb-3" />
                  <h3 className="font-semibold mb-2">Nende ATS lipu tõstab</h3>
                  <p className="text-sm text-slate-600">
                    AI-detektor lükkab sinu kandidatuuri automaatselt tagasi.
                    Ükski inimene seda ei näe. Saad templatetud kirja — või
                    mitte midagi.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <Gavel className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Seadus on sinu poolel</h3>
                  <p className="text-sm text-slate-600">
                    GDPR art. 22(3) annab õiguse otsus vaidlustada ja nõuda
                    inimsekkumist. Enamik kandidaate ei tea seda.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Mida saad teha — 5 minutiga
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Genereeri GDPR kiri
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Sisesta paar välja ja laadi alla juriidiliselt põhjendatud
                  kiri, mis nõuab inimese ülevaatust. EN + ET. Viitab art. 22 +
                  15.
                </p>
                <Link
                  href="/human-review"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Ava generaator <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Raporteeri, mis juhtus
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Mis ettevõte? Kas said inimvastuse? Kui kaua? Ainult
                  struktureeritud andmed — mitte emotsionaalsed arvustused.
                </p>
                <Link
                  href="/submit"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Esita raport <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Võrdle tööandjaid
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Sirvi Human-First skoori — päris kandidaatide andmed, avatud
                  metoodika, mingit raha eest reitingu ostmist.
                </p>
                <Link
                  href="/companies"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Sirvi ettevõtteid <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Miks see nüüd oluline on
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-xl border border-slate-200">
                <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    2. august 2026 — EL AI Act kõrge riski reeglid jõustuvad värbamises
                  </h3>
                  <p className="text-sm text-slate-600">
                    Iga värbamises kasutatav AI süsteem saab &quot;kõrge riski&quot;
                    märgise. Trahvid kuni 35M € või 7% globaalsest käibest.
                    Tööandjad peavad kõike dokumenteerima. Kandidaatidel peab
                    olema viis neid vastutusele võtta.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl border border-slate-200">
                <Scale className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    GDPR art. 22 + 15 kehtivad juba — praegu
                  </h3>
                  <p className="text-sm text-slate-600">
                    Ei pea ootama 2026. aastat. Iga otsus, mis tehakse ainult
                    automatiseeritud töötluse alusel ja millel on õiguslik või
                    sarnaselt oluline mõju, saab vaidlustada. Töölt tagasi
                    lükkamine on oluline. See sait annab sulle kirja.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl border border-slate-200">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Mitte ühtegi makstud reitingut ega sponsorarvustust
                  </h3>
                  <p className="text-sm text-slate-600">
                    Human-First skoor arvutatakse ainult struktureeritud
                    väljadest. Metoodika on avalik. Andmestik on avatud.
                    Ettevõtted saavad vastata, mitte redigeerida.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                href="/methodology"
                className="text-sm text-blue-600 hover:underline"
              >
                Loe metoodikat →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ära lase botil otsustada sinu karjääri üle.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            60 sekundit. Tasuta. Saad päris juriidilise kirja oma postkasti.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-base px-8 h-12"
          >
            <Link href="/human-review">
              Genereeri kiri kohe
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
