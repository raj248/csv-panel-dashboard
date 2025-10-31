"use client";

import { useUploadEvents } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CalendarDays } from "lucide-react";
import { format } from "date-fns";

export default function UploadEventsPage() {
  const { data, isLoading, isError } = useUploadEvents();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin mr-2" /> Loading upload events...
      </div>
    );

  if (isError || !data?.data?.length)
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        No upload events found.
      </div>
    );

  const events = data.data;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Upload Events</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => (
          <Card
            key={i}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                {`Event ${events.length - i}`}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1 text-sm">
              <p>
                <span className="font-medium text-muted-foreground">From:</span>{" "}
                {format(new Date(event.fromDate), "dd MMM yyyy")}
              </p>
              <p>
                <span className="font-medium text-muted-foreground">To:</span>{" "}
                {format(new Date(event.toDate), "dd MMM yyyy")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
