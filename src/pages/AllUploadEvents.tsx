"use client";

import { useAllUploadEvents } from "@/hooks/useUsers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function AllUploadEventsPage() {
  const { data, isLoading, isError } = useAllUploadEvents();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No upload events found.
      </div>
    );
  }

  const events = data.data; // assuming APIResponse<{ userId, email, name, events[] }[]>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Upload Events</h1>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((user) => (
          <Card key={user.userId} className="shadow-sm border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                {user.name || user.email}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </CardHeader>

            <CardContent className="space-y-2">
              {user.events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <span className="text-muted-foreground">From:</span>
                  <span className="font-medium">
                    {format(new Date(event.fromDate), "dd MMM yyyy")}
                  </span>
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium">
                    {format(new Date(event.toDate), "dd MMM yyyy")}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
