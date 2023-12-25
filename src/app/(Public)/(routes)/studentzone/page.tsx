import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudentZone() {
    return (
        <div className="px-2 pt-16">
            <Tabs className="max-w-xl m-auto" defaultValue={"registration"}>
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="registration">
                        Registration
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="icard">
                        I Card
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="marksheet">
                        MarkSheet
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="certificate">
                        Certificate
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="registration">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registratio Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input placeholder="Registration no." />
                        </CardContent>
                        <CardFooter>
                            <Button variant={"primary"} className="w-full">
                                Search
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="icard">
                    <Card>
                        <CardHeader>
                            <CardTitle>I Card Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input placeholder="Registration no." />
                        </CardContent>
                        <CardFooter>
                            <Button variant={"primary"} className="w-full">
                                Search
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="marksheet">
                    <Card>
                        <CardHeader>
                            <CardTitle>MarkSheet Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input placeholder="Registration no." />
                        </CardContent>
                        <CardFooter>
                            <Button variant={"primary"} className="w-full">
                                Search
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="certificate">
                    <Card>
                        <CardHeader>
                            <CardTitle>Certificate Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input placeholder="Registration no." />
                        </CardContent>
                        <CardFooter>
                            <Button variant={"primary"} className="w-full">
                                Search
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
