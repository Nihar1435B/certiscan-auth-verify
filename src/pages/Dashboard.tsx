import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileCheck, 
  Database, 
  BarChart3, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";
import { VerificationUpload } from "@/components/VerificationUpload";
import { DatasetManager } from "@/components/DatasetManager";
import { VerificationHistory } from "@/components/VerificationHistory";

const Dashboard = () => {
  const [stats] = useState({
    totalVerifications: 156,
    validCertificates: 142,
    invalidCertificates: 14,
    datasetsCount: 3
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">CertiScan Dashboard</h1>
              <p className="text-sm text-muted-foreground">University of Example</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Admin</Badge>
            <Button variant="ghost" size="sm">Settings</Button>
            <Button variant="ghost" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVerifications}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valid Certificates</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.validCertificates}</div>
              <p className="text-xs text-muted-foreground">91% success rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invalid Certificates</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.invalidCertificates}</div>
              <p className="text-xs text-muted-foreground">9% flagged</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Datasets</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.datasetsCount}</div>
              <p className="text-xs text-muted-foreground">Active datasets</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="verify" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verify" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Verify Certificate</span>
            </TabsTrigger>
            <TabsTrigger value="datasets" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Datasets</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-4">
            <VerificationUpload />
          </TabsContent>

          <TabsContent value="datasets" className="space-y-4">
            <DatasetManager />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <VerificationHistory />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification Analytics</CardTitle>
                <CardDescription>
                  Detailed statistics and insights about your verification activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Advanced analytics and reporting features will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;