-- MySQL dump 10.13  Distrib 5.6.21, for Win32 (x86)
--
-- Host: localhost    Database: car_rental
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4775 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (4768,'368 Oak Street','Athens','GA','USA',30601),(4769,'3100 Atlanta Hwy','Athens','GA','USA',30606),(4770,'3370 Astondale Rd','Watkinsville','GA','USA',30677),(4771,'4760 Atlanta Highway','Bogart','GA','USA',30622);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `rent`
--

DROP TABLE IF EXISTS `rent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pickDate` date NOT NULL,
  `returnDate` date NOT NULL,
  `totalRent` float DEFAULT NULL,
  `tax` float DEFAULT NULL,
  `confirmationNo` varchar(255) DEFAULT NULL,
  `userID` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `pickupLocID` int(10) unsigned DEFAULT NULL,
  `returnLocID` int(10) unsigned DEFAULT NULL,
  `gps` varchar(255) DEFAULT NULL,
  `damageWaiver` varchar(255) DEFAULT NULL,
  `insurance` varchar(255) DEFAULT NULL,
  `roadsideAssistance` varchar(255) DEFAULT NULL,
  `liabilityProtection` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `class` (`class`),
  KEY `pickupLocID` (`pickupLocID`),
  KEY `returnLocID` (`returnLocID`),
  CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`class`) REFERENCES `vehicleClass` (`class`),
  CONSTRAINT `rent_ibfk_3` FOREIGN KEY (`pickupLocID`) REFERENCES `address` (`id`),
  CONSTRAINT `rent_ibfk_4` FOREIGN KEY (`returnLocID`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rent`
--

LOCK TABLES `rent` WRITE;
/*!40000 ALTER TABLE `rent` DISABLE KEYS */;
INSERT INTO `rent` VALUES (1,'2015-04-15','2015-04-18',0,'zachary','qeuwy87',5,'Economy',4768,4769,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `rent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `street` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dlNumber` int(10) unsigned NOT NULL,
  `expDate` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` int(10) unsigned NOT NULL,
  `role` varchar(255) DEFAULT 'User',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('plainJane','passwd','Jane','Cobb','1960-12-24','245 Alberta Dr','987-123-4560','janerocks@web.com',98765432,'2017-12-24','Athens','GA',30601, 'User');
INSERT INTO `user` VALUES ('dchi', 'password', 'Derek', 'Chi', '1993-01-01', '123 Fake Dr', '555-555-5555', 'chi@web.com', 1234567800, '2016-12-12', 'Athens', 'GA', 30606, 'Admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,	
  `make` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `odometer` float DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `fuel` varchar(255) DEFAULT NULL,
  `drive` varchar(255) DEFAULT NULL,
  `plateNumber` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class` (`class`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`class`) REFERENCES `vehicleClass` (`class`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'Economy','Rio','Kia','Blue',45000,'Automatic','87 octane','2WD','4BY23ZQ','Available'),
(2,'Compact','Versa','Nissan','Red',52000,'Automatic','89','2WD','4ZW89MW','Unavailable');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-04-15 12:20:47

DROP TABLE IF EXISTS `vehicleClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicleClass` (
  `class` varchar(255) NOT NULL,
  `cost` float NOT NULL,
  `features` varchar(255),
  PRIMARY KEY (`class`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicleClass` WRITE;
#/*!40000 ALTER TABLE `vehicleCl` DISABLE KEYS */;
INSERT INTO `vehicleClass` VALUES ('Economy', 27.96, '4 doors, Automatic Transmission, Air Conditioning, AM/FM'),
('Compact', 27.98, '4 Doors, Automatic Transmission, Air Conditioning');
#/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
