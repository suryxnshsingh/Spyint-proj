'use client';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card } from '@/components/ui/card';
import { suspectData } from '@/data/suspectData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function SuspectsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold mb-2">Suspect Profiles</h1>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Active Suspects</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suspectData.map((suspect) => (
                    <TableRow key={suspect.id}>
                      <TableCell>{suspect.name}</TableCell>
                      <TableCell>{suspect.age}</TableCell>
                      <TableCell>{suspect.location}</TableCell>
                      <TableCell>{suspect.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
