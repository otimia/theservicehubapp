'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Opmerking = {
    label: string
    beschrijving: string
    status: 'open' | 'in behandeling' | 'afgerond'
}

export default function Opmerkingen() {
    const [opmerkingen, setOpmerkingen] = useState<Opmerking[]>([])
    const [nieuweOpmerking, setNieuweOpmerking] = useState<Opmerking>({
        label: '',
        beschrijving: '',
        status: 'open'
    })

    const voegOpmerkingToe = () => {
        if (nieuweOpmerking.label.trim() !== '' && nieuweOpmerking.beschrijving.trim() !== '') {
            setOpmerkingen([nieuweOpmerking, ...opmerkingen])
            setNieuweOpmerking({ label: '', beschrijving: '', status: 'open' })
        }
    }

    const getStatusKleur = (status: Opmerking['status']) => {
        switch (status) {
            case 'open': return 'bg-yellow-500'
            case 'in behandeling': return 'bg-blue-500'
            case 'afgerond': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Input
                    type="text"
                    value={nieuweOpmerking.label}
                    onChange={(e) => setNieuweOpmerking({ ...nieuweOpmerking, label: e.target.value })}
                    placeholder="Label"
                    className="w-full"
                />
                <Select
                    value={nieuweOpmerking.status}
                    onValueChange={(value: Opmerking['status']) => setNieuweOpmerking({ ...nieuweOpmerking, status: value })}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecteer status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in behandeling">In behandeling</SelectItem>
                        <SelectItem value="afgerond">Afgerond</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={voegOpmerkingToe} className="w-full">Toevoegen</Button>
            </div>
            <div className="mb-6">
                <Textarea
                    value={nieuweOpmerking.beschrijving}
                    onChange={(e) => setNieuweOpmerking({ ...nieuweOpmerking, beschrijving: e.target.value })}
                    placeholder="Beschrijving"
                    className="w-full"
                    rows={3}
                />
            </div>
            <ul className="space-y-4">
                {opmerkingen.map((opmerking, index) => (
                    <li key={index} className="p-4 bg-secondary rounded-md border border-border">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{opmerking.label}</h3>
                            <Badge className={`${getStatusKleur(opmerking.status)} text-white`}>
                                {opmerking.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">{opmerking.beschrijving}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}