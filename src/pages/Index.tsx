import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

// Мокап данных на основе структуры Google Sheets
const mockData = [
  {
    id: 1,
    name: "Анна Петрова",
    company: "ТехноСтарт",
    position: "Frontend Developer",
    experience: "3 года",
    location: "Москва",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: 2,
    name: "Михаил Сидоров",
    company: "ДигиталПро",
    position: "Backend Developer",
    experience: "5 лет",
    location: "Санкт-Петербург",
    skills: ["Node.js", "Python", "PostgreSQL"],
  },
  {
    id: 3,
    name: "Елена Козлова",
    company: "Инновации+",
    position: "UI/UX Designer",
    experience: "2 года",
    location: "Казань",
    skills: ["Figma", "Sketch", "Adobe XD"],
  },
  {
    id: 4,
    name: "Дмитрий Волков",
    company: "КодСофт",
    position: "Full Stack Developer",
    experience: "7 лет",
    location: "Новосибирск",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    name: "Ольга Морозова",
    company: "ВебСтудия",
    position: "Project Manager",
    experience: "4 года",
    location: "Екатеринбург",
    skills: ["Agile", "Scrum", "Jira"],
  },
  {
    id: 6,
    name: "Алексей Новиков",
    company: "АйТи Решения",
    position: "DevOps Engineer",
    experience: "6 лет",
    location: "Красноярск",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [activeTab, setActiveTab] = useState("table");

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany =
        selectedCompany === "all" || item.company === selectedCompany;
      const matchesLocation =
        selectedLocation === "all" || item.location === selectedLocation;

      return matchesSearch && matchesCompany && matchesLocation;
    });
  }, [searchTerm, selectedCompany, selectedLocation]);

  const companies = [...new Set(mockData.map((item) => item.company))];
  const locations = [...new Set(mockData.map((item) => item.location))];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Icon name="Table" size={24} className="text-gray-700" />
              <h1 className="text-xl font-semibold text-gray-900">
                Публичный список
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Icon name="RefreshCw" size={12} className="mr-1" />
                Синхронизировано
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={14} className="mr-1" />
                Экспорт
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Фильтры</CardTitle>
            <CardDescription>
              Используйте фильтры для поиска нужных данных
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Поиск
                </label>
                <Input
                  placeholder="Поиск по имени, компании или должности..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Компания
                </label>
                <Select
                  value={selectedCompany}
                  onValueChange={setSelectedCompany}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите компанию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все компании</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Локация
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Display */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-medium">Данные</CardTitle>
                <CardDescription>
                  Найдено записей: {filteredData.length}
                </CardDescription>
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger
                    value="table"
                    className="flex items-center space-x-1"
                  >
                    <Icon name="Table" size={14} />
                    <span>Таблица</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cards"
                    className="flex items-center space-x-1"
                  >
                    <Icon name="Grid3x3" size={14} />
                    <span>Карточки</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="table" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Имя</TableHead>
                        <TableHead>Компания</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Опыт</TableHead>
                        <TableHead>Локация</TableHead>
                        <TableHead>Навыки</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.company}</TableCell>
                          <TableCell>{item.position}</TableCell>
                          <TableCell>{item.experience}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="cards" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredData.map((item) => (
                    <Card
                      key={item.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {item.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {item.experience}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {item.position} • {item.company}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Icon name="MapPin" size={14} className="mr-1" />
                            {item.location}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
