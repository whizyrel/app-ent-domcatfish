import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountrycodelistService {
  constructor() {}
  getList() {
    return dropdownList;
  }
}

const dropdownList = [
  {
    cty: 'Afghanistan',
    ctycode: '93',
    iso2: 'AF',
    iso3: 'AFG',
  },
  {
    cty: 'Albania',
    ctycode: '355',
    iso2: 'AL',
    iso3: 'ALB',
  },
  {
    cty: 'Algeria',
    ctycode: '213',
    iso2: 'DZ',
    iso3: 'DZA',
  },
  {
    cty: 'American Samoa',
    ctycode: '1-684',
    iso2: 'AS',
    iso3: 'ASM',
  },
  {
    cty: 'Andorra',
    ctycode: '376',
    iso2: 'AD',
    iso3: 'AND',
  },
  {
    cty: 'Angola',
    ctycode: '244',
    iso2: 'AO',
    iso3: 'AGO',
  },
  {
    cty: 'Anguilla',
    ctycode: '1-264',
    iso2: 'AI',
    iso3: 'AIA',
  },
  {
    cty: 'Antarctica',
    ctycode: '672',
    iso2: 'AQ',
    iso3: 'ATA',
  },
  {
    cty: 'Antigua and Barbuda',
    ctycode: '1-268',
    iso2: 'AG',
    iso3: 'ATG',
  },
  {
    cty: 'Argentina',
    ctycode: '54',
    iso2: 'AR',
    iso3: 'ARG',
  },
  {
    cty: 'Armenia',
    ctycode: '374',
    iso2: 'AM',
    iso3: 'ARM',
  },
  {
    cty: 'Aruba',
    ctycode: '297',
    iso2: 'AW',
    iso3: 'ABW',
  },
  {
    cty: 'Australia',
    ctycode: '61',
    iso2: 'AU',
    iso3: 'AUS',
  },
  {
    cty: 'Austria',
    ctycode: '43',
    iso2: 'AT',
    iso3: 'AUT',
  },
  {
    cty: 'Azerbaijan',
    ctycode: '994',
    iso2: 'AZ',
    iso3: 'AZE',
  },
  {
    cty: 'Bahamas',
    ctycode: '1',
    iso2: '242',
    iso3: 'BS',
  },
  {
    cty: 'Bahrain',
    ctycode: '973',
    iso2: 'BH',
    iso3: 'BHR',
  },
  {
    cty: 'Bangladesh',
    ctycode: '880',
    iso2: 'BD',
    iso3: 'BGD',
    rest: ['156', '118', '464', '144', '000', '140', '2', 'Billion'],
  },
  {
    cty: 'Barbados',
    ctycode: '1',
    iso2: '246',
    iso3: 'BB',
    rest: ['BRB', '285', '653', '431', '4', '262', 'Billion'],
  },
  {
    cty: 'Belarus',
    ctycode: '375',
    iso2: 'BY',
    iso3: 'BLR',
    rest: ['9', '685', '000', '207', '600', '69', '24', 'Billion'],
  },
  {
    cty: 'Belgium',
    ctycode: '32',
    iso2: 'BE',
    iso3: 'BEL',
    rest: ['10', '403', '000', '30', '510', '507', '4', 'Billion'],
  },
  {
    cty: 'Belize',
    ctycode: '501',
    iso2: 'BZ',
    iso3: 'BLZ',
    rest: ['314', '522', '22', '966', '1', '637', 'Billion'],
  },
  {
    cty: 'Benin',
    ctycode: '229',
    iso2: 'BJ',
    iso3: 'BEN',
    rest: ['9', '056', '010', '112', '620', '8', '359', 'Billion'],
  },
  {
    cty: 'Bermuda',
    ctycode: '1',
    iso2: '441',
    iso3: 'BM',
    rest: ['BMU', '65', '365', '53', '5', '6', 'Billion'],
  },
  {
    cty: 'Bhutan',
    ctycode: '975',
    iso2: 'BT',
    iso3: 'BTN',
    rest: ['699', '847', '47', '000', '2', '133', 'Billion'],
  },
  {
    cty: 'Bolivia',
    ctycode: '591',
    iso2: 'BO',
    iso3: 'BOL',
    rest: ['9', '947', '418', '1', '098', '580', '30', '79', 'Billion'],
  },
  {
    cty: 'Bosnia and Herzegovina',
    ctycode: '387',
    iso2: 'BA',
    iso3: 'BIH',
  },
  {
    cty: 'Botswana',
    ctycode: '267',
    iso2: 'BW',
    iso3: 'BWA',
    rest: ['2', '029', '307', '600', '370', '15', '53', 'Billion'],
  },
  {
    cty: 'Brazil',
    ctycode: '55',
    iso2: 'BR',
    iso3: 'BRA',
    rest: ['201', '103', '330', '8', '511', '965', '2', '19', 'Trillion'],
  },
  {
    cty: 'British Indian Ocean Territory',
    ctycode: '246',
    iso2: 'IO',
    iso3: 'IOT',
    rest: ['4', '000', '60'],
  },
  {
    cty: 'British VirginIslands',
    ctycode: '1-284',
    iso2: 'VG',
    iso3: 'VGB',
    rest: ['284', '', '', '21', '730', '153', '1', '095', 'Billion'],
  },
  {
    cty: 'Brunei',
    ctycode: '673',
    iso2: 'BN',
    iso3: 'BRN',
    rest: ['395', '027', '5', '770', '16', '56', 'Billion'],
  },
  {
    cty: 'Bulgaria',
    ctycode: '359',
    iso2: 'BG',
    iso3: 'BGR',
    rest: ['7', '148', '785', '110', '910', '53', '7', 'Billion'],
  },
  {
    cty: 'Burkina Faso',
    ctycode: '226',
    iso2: 'BF',
    iso3: 'BFA',
    rest: ['', '16', '241', '811', '274', '200', '12', '13', 'Billion'],
  },
  {
    cty: 'Burundi',
    ctycode: '257',
    iso2: 'BI',
    iso3: 'BDI',
    rest: ['9', '863', '117', '27', '830', '2', '676', 'Billion'],
  },
  {
    cty: 'Cambodia',
    ctycode: '855',
    iso2: 'KH',
    iso3: 'KHM',
    rest: ['14', '453', '680', '181', '040', '15', '64', 'Billion'],
  },
  {
    cty: 'Cameroon',
    ctycode: '237',
    iso2: 'CM',
    iso3: 'CMR',
    rest: ['19', '294', '149', '475', '440', '27', '88', 'Billion'],
  },
  {
    cty: 'Canada',
    ctycode: '1',
    iso2: 'CA',
    iso3: 'CAN',
    rest: ['33', '679', '000', '9', '984', '670', '1', '825', 'Trillion'],
  },
  {
    cty: 'Cape Verde',
    ctycode: '238',
    iso2: 'CV',
    iso3: 'CPV',
    rest: ['', '508', '659', '4', '033', '1', '955', 'Billion'],
  },
  {
    cty: 'Cayman Islands',
    ctycode: '1-345',
    iso2: 'KY',
    iso3: 'CYM',
    rest: ['', '', '44', '270', '262', '2', '25', 'Billion'],
  },
  {
    cty: 'Central African Republic',
    ctycode: '236',
    iso2: 'CF',
    iso3: 'CAF',
    rest: ['', '', '4', '844', '927', '622', '984', '2', '05', 'Billion'],
  },
  {
    cty: 'Chad',
    ctycode: '235',
    iso2: 'TD',
    iso3: 'TCD',
    rest: ['10', '543', '464', '1', '284', '000', '13', '59', 'Billion'],
  },
  {
    cty: 'Chile',
    ctycode: '56',
    iso2: 'CL',
    iso3: 'CHL',
    rest: ['16', '746', '491', '756', '950', '281', '7', 'Billion'],
  },
  {
    cty: 'China',
    ctycode: '86',
    iso2: 'CN',
    iso3: 'CHN',
  },
  {
    cty: 'Christmas Island',
    ctycode: '61',
    iso2: 'CX',
    iso3: 'CXR',
    rest: ['', '1', '500', '135'],
  },
  {
    cty: 'Cocos Islands',
    ctycode: '61',
    iso2: 'CC',
    iso3: 'CCK',
    rest: ['', '628', '14'],
  },
  {
    cty: 'Colombia',
    ctycode: '57',
    iso2: 'CO',
    iso3: 'COL',
    rest: ['47', '790', '000', '1', '138', '910', '369', '2', 'Billion'],
  },
  {
    cty: 'Comoros',
    ctycode: '269',
    iso2: 'KM',
    iso3: 'COM',
    rest: ['773', '407', '2', '170', '658', 'Million'],
  },
  {
    cty: 'Cook Islands',
    ctycode: '682',
    iso2: 'CK',
    iso3: 'COK',
    rest: ['', '21', '388', '240', '183', '2', 'Million'],
  },
  {
    cty: 'Costa Rica',
    ctycode: '506',
    iso2: 'CR',
    iso3: 'CRI',
    rest: ['', '4', '516', '220', '51', '100', '48', '51', 'Billion'],
  },
  {
    cty: 'Croatia',
    ctycode: '385',
    iso2: 'HR',
    iso3: 'HRV',
    rest: ['4', '491', '000', '56', '542', '59', '14', 'Billion'],
  },
  {
    cty: 'Cuba',
    ctycode: '53',
    iso2: 'CU',
    iso3: 'CUB',
    rest: ['11', '423', '000', '110', '860', '72', '3', 'Billion'],
  },
  {
    cty: 'Curacao',
    ctycode: '599',
    iso2: 'CW',
    iso3: 'CUW',
    rest: ['141', '766', '444', '5', '6', 'Billion'],
  },
  {
    cty: 'Cyprus',
    ctycode: '357',
    iso2: 'CY',
    iso3: 'CYP',
    rest: ['1', '102', '677', '9', '250', '21', '78', 'Billion'],
  },
  {
    cty: 'Czech Republic',
    ctycode: '420',
    iso2: 'CZ',
    iso3: 'CZE',
    rest: ['', '10', '476', '000', '78', '866', '194', '8', 'Billion'],
  },
  {
    cty: 'Democratic Republic of the Congo',
    ctycode: '243',
    iso2: 'CD',
    iso3: 'COD',
    rest: [
      '',
      '',
      '',
      '',
      '70',
      '916',
      '439',
      '2',
      '345',
      '410',
      '18',
      '56',
      'Billion',
    ],
  },
  {
    cty: 'Denmark',
    ctycode: '45',
    iso2: 'DK',
    iso3: 'DNK',
    rest: ['5', '484', '000', '43', '094', '324', '3', 'Billion'],
  },
  {
    cty: 'Djibouti',
    ctycode: '253',
    iso2: 'DJ',
    iso3: 'DJI',
    rest: ['740', '528', '23', '000', '1', '459', 'Billion'],
  },
  {
    cty: 'Dominica',
    ctycode: '1',
    iso2: '767',
    iso3: 'DM',
    rest: ['DMA', '72', '813', '754', '495', 'Million'],
  },
  {
    cty: 'Dominican Republic',
    ctycode: '1-809',
    iso2: 'DO',
    iso3: 'D0M',
  },
  {
    cty: 'Dominican Republic',
    ctycode: '1-829',
    iso2: 'DO',
    iso3: 'D0M',
  },
  {
    cty: 'Dominican Republic',
    ctycode: '1-849',
    iso2: 'DO',
    iso3: 'D0M',
  },
  {
    cty: 'East Timor',
    ctycode: '670',
    iso2: 'TL',
    iso3: 'TLS',
    rest: ['', '1', '154', '625', '15', '007', '6', '129', 'Billion'],
  },
  {
    cty: 'Ecuador',
    ctycode: '593',
    iso2: 'EC',
    iso3: 'ECU',
    rest: ['14', '790', '608', '283', '560', '91', '41', 'Billion'],
  },
  {
    cty: 'Egypt',
    ctycode: '20',
    iso2: 'EG',
    iso3: 'EGY',
    rest: ['80', '471', '869', '1', '001', '450', '262', 'Billion'],
  },
  {
    cty: 'El Salvador',
    ctycode: '503',
    iso2: 'SV',
    iso3: 'SLV',
    rest: ['', '6', '052', '064', '21', '040', '24', '67', 'Billion'],
  },
  {
    cty: 'Equatorial Guinea',
    ctycode: '240',
    iso2: 'GQ',
    iso3: 'GNQ',
    rest: ['', '1', '014', '999', '28', '051', '17', '08', 'Billion'],
  },
  {
    cty: 'Eritrea',
    ctycode: '291',
    iso2: 'ER',
    iso3: 'ERI',
    rest: ['5', '792', '984', '121', '320', '3', '438', 'Billion'],
  },
  {
    cty: 'Estonia',
    ctycode: '372',
    iso2: 'EE',
    iso3: 'EST',
    rest: ['1', '291', '170', '45', '226', '24', '28', 'Billion'],
  },
  {
    cty: 'Ethiopia',
    ctycode: '251',
    iso2: 'ET',
    iso3: 'ETH',
    rest: ['88', '013', '491', '1', '127', '127', '47', '34', 'Billion'],
  },
  {
    cty: 'Falkland Islands',
    ctycode: '500',
    iso2: 'FK',
    iso3: 'FLK',
    rest: ['', '2', '638', '12', '173', '164', '5', 'Million'],
  },
  {
    cty: 'Faroe Islands',
    ctycode: '298',
    iso2: 'FO',
    iso3: 'FRO',
    rest: ['', '48', '228', '1', '399', '2', '32', 'Billion'],
  },
  {
    cty: 'Fiji',
    ctycode: '679',
    iso2: 'FJ',
    iso3: 'FJI',
    rest: ['875', '983', '18', '270', '4', '218', 'Billion'],
  },
  {
    cty: 'Finland',
    ctycode: '358',
    iso2: 'FI',
    iso3: 'FIN',
    rest: ['5', '244', '000', '337', '030', '259', '6', 'Billion'],
  },
  {
    cty: 'France',
    ctycode: '33',
    iso2: 'FR',
    iso3: 'FRA',
    rest: ['64', '768', '389', '547', '030', '2', '739', 'Trillion'],
  },
  {
    cty: 'French Polynesia',
    ctycode: '689',
    iso2: 'PF',
    iso3: 'PYF',
    rest: ['', '270', '485', '4', '167', '5', '65', 'Billion'],
  },
  {
    cty: 'Gabon',
    ctycode: '241',
    iso2: 'GA',
    iso3: 'GAB',
    rest: ['1', '545', '255', '267', '667', '19', '97', 'Billion'],
  },
  {
    cty: 'Gambia',
    ctycode: '220',
    iso2: 'GM',
    iso3: 'GMB',
    rest: ['1', '593', '256', '11', '300', '896', 'Million'],
  },
  {
    cty: 'Georgia',
    ctycode: '995',
    iso2: 'GE',
    iso3: 'GEO',
    rest: ['4', '630', '000', '69', '700', '15', '95', 'Billion'],
  },
  {
    cty: 'Germany',
    ctycode: '49',
    iso2: 'DE',
    iso3: 'DEU',
    rest: ['81', '802', '257', '357', '021', '3', '593', 'Trillion'],
  },
  {
    cty: 'Ghana',
    ctycode: '233',
    iso2: 'GH',
    iso3: 'GHA',
    rest: ['24', '339', '838', '239', '460', '45', '55', 'Billion'],
  },
  {
    cty: 'Gibraltar',
    ctycode: '350',
    iso2: 'GI',
    iso3: 'GIB',
    rest: ['27', '884', '7', '1', '106', 'Billion'],
  },
  {
    cty: 'Greece',
    ctycode: '30',
    iso2: 'GR',
    iso3: 'GRC',
    rest: ['11', '000', '000', '131', '940', '243', '3', 'Billion'],
  },
  {
    cty: 'Greenland',
    ctycode: '299',
    iso2: 'GL',
    iso3: 'GRL',
    rest: ['56', '375', '2', '166', '086', '2', '16', 'Billion'],
  },
  {
    cty: 'Grenada',
    ctycode: '1-473',
    iso2: 'GD',
    iso3: 'GRD',
  },
  {
    cty: 'Guam',
    ctycode: '1-671',
    iso2: 'GU',
    iso3: 'GUM',
    rest: ['', '159', '358', '549', '4', '6', 'Billion'],
  },
  {
    cty: 'Guatemala',
    ctycode: '502',
    iso2: 'GT',
    iso3: 'GTM',
    rest: ['13', '550', '440', '108', '890', '53', '9', 'Billion'],
  },
  {
    cty: 'Guernsey',
    ctycode: '44-1481',
    iso2: 'GG',
    iso3: 'GGY',
  },
  {
    cty: 'Guinea',
    ctycode: '224',
    iso2: 'GN',
    iso3: 'GIN',
    rest: ['10', '324', '025', '245', '857', '6', '544', 'Billion'],
  },
  {
    cty: 'Guinea Bissau',
    ctycode: '245',
    iso2: 'GW',
    iso3: 'GNB',
    rest: ['', '1', '565', '126', '36', '120', '880', 'Million'],
  },
  {
    cty: 'Guyana',
    ctycode: '592',
    iso2: 'GY',
    iso3: 'GUY',
    rest: ['748', '486', '214', '970', '3', '02', 'Billion'],
  },
  {
    cty: 'Haiti',
    ctycode: '509',
    iso2: 'HT',
    iso3: 'HTI',
    rest: ['9', '648', '924', '27', '750', '8', '287', 'Billion'],
  },
  {
    cty: 'Honduras',
    ctycode: '504',
    iso2: 'HN',
    iso3: 'HND',
    rest: ['7', '989', '415', '112', '090', '18', '88', 'Billion'],
  },
  {
    cty: 'Hong Kong',
    ctycode: '852',
    iso2: 'HK',
    iso3: 'HKG',
    rest: ['', '6', '898', '686', '1', '092', '272', '1', 'Billion'],
  },
  {
    cty: 'Hungary',
    ctycode: '36',
    iso2: 'HU',
    iso3: 'HUN',
    rest: ['9', '982', '000', '93', '030', '130', '6', 'Billion'],
  },
  {
    cty: 'Iceland',
    ctycode: '354',
    iso2: 'IS',
    iso3: 'ISL',
    rest: ['308', '910', '103', '000', '14', '59', 'Billion'],
  },
  {
    cty: 'India',
    ctycode: '91',
    iso2: 'IN',
    iso3: 'IND',
  },
  {
    cty: 'Indonesia',
    ctycode: '62',
    iso2: 'ID',
    iso3: 'IDN',
    rest: ['242', '968', '342', '1', '919', '440', '867', '5', 'Billion'],
  },
  {
    cty: 'Iran',
    ctycode: '98',
    iso2: 'IR',
    iso3: 'IRN',
    rest: ['76', '923', '300', '1', '648', '000', '411', '9', 'Billion'],
  },
  {
    cty: 'Iraq',
    ctycode: '964',
    iso2: 'IQ',
    iso3: 'IRQ',
    rest: ['29', '671', '605', '437', '072', '221', '8', 'Billion'],
  },
  {
    cty: 'Ireland',
    ctycode: '353',
    iso2: 'IE',
    iso3: 'IRL',
    rest: ['4', '622', '917', '70', '280', '220', '9', 'Billion'],
  },
  {
    cty: 'Isle of Man',
    ctycode: '44-1624',
    iso2: 'IM',
    iso3: 'IMN',
    rest: ['', '', '', '75', '049', '572', '4', '076', 'Billion'],
  },
  {
    cty: 'Israel',
    ctycode: '972',
    iso2: 'IL',
    iso3: 'ISR',
    rest: ['7', '353', '985', '20', '770', '272', '7', 'Billion'],
  },
  {
    cty: 'Italy',
    ctycode: '39',
    iso2: 'IT',
    iso3: 'ITA',
    rest: ['60', '340', '328', '301', '230', '2', '068', 'Trillion'],
  },
  {
    cty: 'Ivory Coast',
    ctycode: '225',
    iso2: 'CI',
    iso3: 'CIV',
    rest: ['', '21', '058', '798', '322', '460', '28', '28', 'Billion'],
  },
  {
    cty: 'Jamaica',
    ctycode: '1',
    iso2: '876',
    iso3: 'JM',
    rest: ['JAM', '2', '847', '232', '10', '991', '14', '39', 'Billion'],
  },
  {
    cty: 'Japan',
    ctycode: '81',
    iso2: 'JP',
    iso3: 'JPN',
    rest: ['127', '288', '000', '377', '835', '5', '007', 'Trillion'],
  },
  {
    cty: 'Jersey',
    ctycode: '44-1534',
    iso2: 'JE',
    iso3: 'JEY',
    rest: ['', '90', '812', '116', '5', '1', 'Billion'],
  },
  {
    cty: 'Jordan',
    ctycode: '962',
    iso2: 'JO',
    iso3: 'JOR',
    rest: ['6', '407', '085', '92', '300', '34', '08', 'Billion'],
  },
  {
    cty: 'Kazakhstan',
    ctycode: '7',
    iso2: 'KZ',
    iso3: 'KAZ',
    rest: ['15', '340', '000', '2', '717', '300', '224', '9', 'Billion'],
  },
  {
    cty: 'Kenya',
    ctycode: '254',
    iso2: 'KE',
    iso3: 'KEN',
    rest: ['40', '046', '566', '582', '650', '45', '31', 'Billion'],
  },
  {
    cty: 'Kiribati',
    ctycode: '686',
    iso2: 'KI',
    iso3: 'KIR',
    rest: ['92', '533', '811', '173', 'Million'],
  },
  {
    cty: 'Kosovo',
    ctycode: '383',
    iso2: 'XK',
    iso3: 'XKX',
    rest: ['1', '800', '000', '10', '887', '7', '15', 'Billion'],
  },
  {
    cty: 'Kuwait',
    ctycode: '965',
    iso2: 'KW',
    iso3: 'KWT',
    rest: ['2', '789', '132', '17', '820', '179', '5', 'Billion'],
  },
  {
    cty: 'Kyrgyzstan',
    ctycode: '996',
    iso2: 'KG',
    iso3: 'KGZ',
    rest: ['5', '508', '626', '198', '500', '7', '234', 'Billion'],
  },
  {
    cty: 'Laos',
    ctycode: '856',
    iso2: 'LA',
    iso3: 'LAO',
    rest: ['6', '368', '162', '236', '800', '10', '1', 'Billion'],
  },
  {
    cty: 'Latvia',
    ctycode: '371',
    iso2: 'LV',
    iso3: 'LVA',
    rest: ['2', '217', '969', '64', '589', '30', '38', 'Billion'],
  },
  {
    cty: 'Lebanon',
    ctycode: '961',
    iso2: 'LB',
    iso3: 'LBN',
    rest: ['4', '125', '247', '10', '400', '43', '49', 'Billion'],
  },
  {
    cty: 'Lesotho',
    ctycode: '266',
    iso2: 'LS',
    iso3: 'LSO',
    rest: ['1', '919', '552', '30', '355', '2', '457', 'Billion'],
  },
  {
    cty: 'Liberia',
    ctycode: '231',
    iso2: 'LR',
    iso3: 'LBR',
    rest: ['3', '685', '076', '111', '370', '1', '977', 'Billion'],
  },
  {
    cty: 'Libya',
    ctycode: '218',
    iso2: 'LY',
    iso3: 'LBY',
    rest: ['6', '461', '454', '1', '759', '540', '70', '92', 'Billion'],
  },
  {
    cty: 'Liechtenstein',
    ctycode: '423',
    iso2: 'LI',
    iso3: 'LIE',
    rest: ['35', '000', '160', '5', '113', 'Billion'],
  },
  {
    cty: 'Lithuania',
    ctycode: '370',
    iso2: 'LT',
    iso3: 'LTU',
    rest: ['2', '944', '459', '65', '200', '46', '71', 'Billion'],
  },
  {
    cty: 'Luxembourg',
    ctycode: '352',
    iso2: 'LU',
    iso3: 'LUX',
    rest: ['497', '538', '2', '586', '60', '54', 'Billion'],
  },
  {
    cty: 'Macau',
    ctycode: '853',
    iso2: 'MO',
    iso3: 'MAC',
    rest: ['449', '198', '254', '51', '68', 'Billion'],
  },
  {
    cty: 'Macedonia',
    ctycode: '389',
    iso2: 'MK',
    iso3: 'MKD',
    rest: ['2', '062', '294', '25', '333', '10', '65', 'Billion'],
  },
  {
    cty: 'Madagascar',
    ctycode: '261',
    iso2: 'MG',
    iso3: 'MDG',
    rest: ['21', '281', '844', '587', '040', '10', '53', 'Billion'],
  },
  {
    cty: 'Malawi',
    ctycode: '265',
    iso2: 'MW',
    iso3: 'MWI',
    rest: ['15', '447', '500', '118', '480', '3', '683', 'Billion'],
  },
  {
    cty: 'Malaysia',
    ctycode: '60',
    iso2: 'MY',
    iso3: 'MYS',
    rest: ['28', '274', '729', '329', '750', '312', '4', 'Billion'],
  },
  {
    cty: 'Maldives',
    ctycode: '960',
    iso2: 'MV',
    iso3: 'MDV',
    rest: ['395', '650', '300', '2', '27', 'Billion'],
  },
  {
    cty: 'Mali',
    ctycode: '223',
    iso2: 'ML',
    iso3: 'MLI',
    rest: ['13', '796', '354', '1', '240', '000', '11', '37', 'Billion'],
  },
  {
    cty: 'Malta',
    ctycode: '356',
    iso2: 'MT',
    iso3: 'MLT',
    rest: ['403', '000', '316', '9', '541', 'Billion'],
  },
  {
    cty: 'Marshall Islands',
    ctycode: '692',
    iso2: 'MH',
    iso3: 'MHL',
    rest: ['', '65', '859', '181', '193', 'Million'],
  },
  {
    cty: 'Mauritania',
    ctycode: '222',
    iso2: 'MR',
    iso3: 'MRT',
    rest: ['3', '205', '060', '1', '030', '700', '4', '183', 'Billion'],
  },
  {
    cty: 'Mauritius',
    ctycode: '230',
    iso2: 'MU',
    iso3: 'MUS',
    rest: ['1', '294', '104', '2', '040', '11', '9', 'Billion'],
  },
  {
    cty: 'Mayotte',
    ctycode: '262',
    iso2: 'YT',
    iso3: 'MYT',
    rest: ['159', '042', '374'],
  },
  {
    cty: 'Mexico',
    ctycode: '52',
    iso2: 'MX',
    iso3: 'MEX',
    rest: ['112', '468', '855', '1', '972', '550', '1', '327', 'Trillion'],
  },
  {
    cty: 'Micronesia',
    ctycode: '691',
    iso2: 'FM',
    iso3: 'FSM',
    rest: ['107', '708', '702', '339', 'Million'],
  },
  {
    cty: 'Moldova',
    ctycode: '373',
    iso2: 'MD',
    iso3: 'MDA',
    rest: ['4', '324', '000', '33', '843', '7', '932', 'Billion'],
  },
  {
    cty: 'Monaco',
    ctycode: '377',
    iso2: 'MC',
    iso3: 'MCO',
    rest: ['32', '965', '2', '5', '748', 'Billion'],
  },
  {
    cty: 'Mongolia',
    ctycode: '976',
    iso2: 'MN',
    iso3: 'MNG',
    rest: ['3', '086', '918', '1', '565', '000', '11', '14', 'Billion'],
  },
  {
    cty: 'Montenegro',
    ctycode: '382',
    iso2: 'ME',
    iso3: 'MNE',
    rest: ['666', '730', '14', '026', '4', '518', 'Billion'],
  },
  {
    cty: 'Montserrat',
    ctycode: '1-664',
    iso2: 'MS',
    iso3: 'MSR',
    rest: ['', '9', '341', '102'],
  },
  {
    cty: 'Morocco',
    ctycode: '212',
    iso2: 'MA',
    iso3: 'MAR',
    rest: ['31', '627', '428', '446', '550', '104', '8', 'Billion'],
  },
  {
    cty: 'Mozambique',
    ctycode: '258',
    iso2: 'MZ',
    iso3: 'MOZ',
    rest: ['22', '061', '451', '801', '590', '14', '67', 'Billion'],
  },
  {
    cty: 'Myanmar',
    ctycode: '95',
    iso2: 'MM',
    iso3: 'MMR',
    rest: ['53', '414', '374', '678', '500', '59', '43', 'Billion'],
  },
  {
    cty: 'Namibia',
    ctycode: '264',
    iso2: 'NA',
    iso3: 'NAM',
    rest: ['2', '128', '471', '825', '418', '12', '3', 'Billion'],
  },
  {
    cty: 'Nauru',
    ctycode: '674',
    iso2: 'NR',
    iso3: 'NRU',
    rest: ['10', '065', '21'],
  },
  {
    cty: 'Nepal',
    ctycode: '977',
    iso2: 'NP',
    iso3: 'NPL',
    rest: ['28', '951', '852', '140', '800', '19', '34', 'Billion'],
  },
  {
    cty: 'Netherlands',
    ctycode: '31',
    iso2: 'NL',
    iso3: 'NLD',
    rest: ['16', '645', '000', '41', '526', '722', '3', 'Billion'],
  },
  {
    cty: 'Netherlands Antilles',
    ctycode: '599',
    iso2: 'AN',
    iso3: 'ANT',
    rest: ['', '136', '197', '960'],
  },
  {
    cty: 'New Caledonia',
    ctycode: '687',
    iso2: 'NC',
    iso3: 'NCL',
    rest: ['', '216', '494', '19', '060', '9', '28', 'Billion'],
  },
  {
    cty: 'New Zealand',
    ctycode: '64',
    iso2: 'NZ',
    iso3: 'NZL',
    rest: ['', '4', '252', '277', '268', '680', '181', '1', 'Billion'],
  },
  {
    cty: 'Nicaragua',
    ctycode: '505',
    iso2: 'NI',
    iso3: 'NIC',
    rest: ['5', '995', '928', '129', '494', '11', '26', 'Billion'],
  },
  {
    cty: 'Niger',
    ctycode: '227',
    iso2: 'NE',
    iso3: 'NER',
    rest: ['15', '878', '271', '1', '267', '000', '7', '304', 'Billion'],
  },
  {
    cty: 'Nigeria',
    ctycode: '234',
    iso2: 'NG',
    iso3: 'NGA',
    rest: ['154', '000', '000', '923', '768', '502', 'Billion'],
  },
  {
    cty: 'Niue',
    ctycode: '683',
    iso2: 'NU',
    iso3: 'NIU',
    rest: ['2', '166', '260', '10', '01', 'Million'],
  },
  {
    cty: 'North Korea',
    ctycode: '850',
    iso2: 'KP',
    iso3: 'PRK',
    rest: ['', '22', '912', '177', '120', '540', '28', 'Billion'],
  },
  {
    cty: 'Northern Mariana Islands',
    ctycode: '1-670',
    iso2: 'MP',
    iso3: 'MNP',
    rest: ['', '', '', '53', '883', '477', '733', 'Million'],
  },
  {
    cty: 'Norway',
    ctycode: '47',
    iso2: 'NO',
    iso3: 'NOR',
    rest: ['5', '009', '150', '324', '220', '515', '8', 'Billion'],
  },
  {
    cty: 'Oman',
    ctycode: '968',
    iso2: 'OM',
    iso3: 'OMN',
    rest: ['2', '967', '717', '212', '460', '81', '95', 'Billion'],
  },
  {
    cty: 'Pakistan',
    ctycode: '92',
    iso2: 'PK',
    iso3: 'PAK',
    rest: ['184', '404', '791', '803', '940', '236', '5', 'Billion'],
  },
  {
    cty: 'Palau',
    ctycode: '680',
    iso2: 'PW',
    iso3: 'PLW',
    rest: ['19', '907', '458', '221', 'Million'],
  },
  {
    cty: 'Palestine',
    ctycode: '970',
    iso2: 'PS',
    iso3: 'PSE',
    rest: ['3', '800', '000', '5', '970', '6', '641', 'Billion'],
  },
  {
    cty: 'Panama',
    ctycode: '507',
    iso2: 'PA',
    iso3: 'PAN',
    rest: ['3', '410', '676', '78', '200', '40', '62', 'Billion'],
  },
  {
    cty: 'Papua New Guinea',
    ctycode: '675',
    iso2: 'PG',
    iso3: 'PNG',
    rest: ['', '', '6', '064', '515', '462', '840', '16', '1', 'Billion'],
  },
  {
    cty: 'Paraguay',
    ctycode: '595',
    iso2: 'PY',
    iso3: 'PRY',
    rest: ['6', '375', '830', '406', '750', '30', '56', 'Billion'],
  },
  {
    cty: 'Peru',
    ctycode: '51',
    iso2: 'PE',
    iso3: 'PER',
    rest: ['29', '907', '003', '1', '285', '220', '210', '3', 'Billion'],
  },
  {
    cty: 'Philippines',
    ctycode: '63',
    iso2: 'PH',
    iso3: 'PHL',
    rest: ['99', '900', '177', '300', '000', '272', '2', 'Billion'],
  },
  {
    cty: 'Pitcairn',
    ctycode: '64',
    iso2: 'PN',
    iso3: 'PCN',
    rest: ['46', '47'],
  },
  {
    cty: 'Poland',
    ctycode: '48',
    iso2: 'PL',
    iso3: 'POL',
    rest: ['38', '500', '000', '312', '685', '513', '9', 'Billion'],
  },
  {
    cty: 'Portugal',
    ctycode: '351',
    iso2: 'PT',
    iso3: 'PRT',
    rest: ['10', '676', '000', '92', '391', '219', '3', 'Billion'],
  },
  {
    cty: 'Puerto Rico',
    ctycode: '1-787, 1-939',
    iso2: 'PR',
    iso3: 'PRI',
  },
  {
    cty: 'Puerto Rico',
    ctycode: '1-939',
    iso2: 'PR',
    iso3: 'PRI',
  },
  {
    cty: 'Qatar',
    ctycode: '974',
    iso2: 'QA',
    iso3: 'QAT',
    rest: ['840', '926', '11', '437', '213', '1', 'Billion'],
  },
  {
    cty: 'Republic of the Congo',
    ctycode: '242',
    iso2: 'CG',
    iso3: 'COG',
    rest: [
      '',
      '',
      '',
      '3',
      '039',
      '126',
      '342',
      '000',
      '14',
      '25',
      'Billion',
    ],
  },
  {
    cty: 'Reunion',
    ctycode: '262',
    iso2: 'RE',
    iso3: 'REU',
    rest: ['776', '948', '2', '517'],
  },
  {
    cty: 'Romania',
    ctycode: '40',
    iso2: 'RO',
    iso3: 'ROU',
    rest: ['21', '959', '278', '237', '500', '188', '9', 'Billion'],
  },
  {
    cty: 'Russia',
    ctycode: '7',
    iso2: 'RU',
    iso3: 'RUS',
    rest: ['140', '702', '000', '17', '100', '000', '2', '113', 'Trillion'],
  },
  {
    cty: 'Rwanda',
    ctycode: '250',
    iso2: 'RW',
    iso3: 'RWA',
    rest: ['11', '055', '976', '26', '338', '7', '7', 'Billion'],
  },
  {
    cty: 'Saint Barthelemy',
    ctycode: '590',
    iso2: 'BL',
    iso3: 'BLM',
    rest: ['', '8', '450', '21'],
  },
  {
    cty: 'Saint Helena',
    ctycode: '290',
    iso2: 'SH',
    iso3: 'SHN',
    rest: ['', '7', '460', '410'],
  },
  {
    cty: 'Saint Kitts and Nevis',
    ctycode: '1-869',
    iso2: 'KN',
    iso3: 'KNA',
    rest: ['1', '869', 'KN', 'KNA', '51', '134', '261', '767', 'Million'],
  },
  {
    cty: 'Saint Lucia',
    ctycode: '1-758',
    iso2: 'LC',
    iso3: 'LCA',
    rest: ['LC', 'LCA', '160', '922', '616', '1', '377', 'Billion'],
  },
  {
    cty: 'Saint Martin',
    ctycode: '590',
    iso2: 'MF',
    iso3: 'MAF',
    rest: ['', '35', '925', '53', '561', '5', 'Million'],
  },
  {
    cty: 'Saint Pierre and Miquelon',
    ctycode: '508',
    iso2: 'PM',
    iso3: 'SPM',
    rest: ['', '', '', '7', '012', '242', '215', '3', 'Million'],
  },
  {
    cty: 'Saint Vincent and the Grenadines',
    ctycode: '1-784',
    iso2: 'VC',
    iso3: 'VCT',
    rest: [
      '',
      '1',
      '784',
      'VC',
      'VCT',
      '104',
      '217',
      '389',
      '742',
      'Million',
    ],
  },
  {
    cty: 'Samoa',
    ctycode: '685',
    iso2: 'WS',
    iso3: 'WSM',
    rest: ['192', '001', '2', '944', '705', 'Million'],
  },
  {
    cty: 'San Marino',
    ctycode: '378',
    iso2: 'SM',
    iso3: 'SMR',
    rest: ['', '31', '477', '61', '1', '866', 'Billion'],
  },
  {
    cty: 'Sao Tome and Principe',
    ctycode: '239',
    iso2: 'ST',
    iso3: 'STP',
    rest: ['', '', '', '175', '808', '1', '001', '311', 'Million'],
  },
  {
    cty: 'Saudi Arabia',
    ctycode: '966',
    iso2: 'SA',
    iso3: 'SAU',
    rest: [
      '',
      '25',
      '731',
      '776',
      '1',
      '960',
      '582',
      '718',
      '5',
      'Billion',
    ],
  },
  {
    cty: 'Senegal',
    ctycode: '221',
    iso2: 'SN',
    iso3: 'SEN',
    rest: ['12', '323', '252', '196', '190', '15', '36', 'Billion'],
  },
  {
    cty: 'Serbia',
    ctycode: '381',
    iso2: 'RS',
    iso3: 'SRB',
    rest: ['7', '344', '847', '88', '361', '43', '68', 'Billion'],
  },
  {
    cty: 'Seychelles',
    ctycode: '248',
    iso2: 'SC',
    iso3: 'SYC',
    rest: ['88', '340', '455', '1', '271', 'Billion'],
  },
  {
    cty: 'Sierra Leone',
    ctycode: '232',
    iso2: 'SL',
    iso3: 'SLE',
    rest: ['', '5', '245', '695', '71', '740', '4', '607', 'Billion'],
  },
  {
    cty: 'Singapore',
    ctycode: '65',
    iso2: 'SG',
    iso3: 'SGP',
    rest: ['4', '701', '069', '693', '295', '7', 'Billion'],
  },
  {
    cty: 'Sint Maarten',
    ctycode: '1-721',
    iso2: 'SX',
    iso3: 'SXM',
    rest: ['SX', 'SXM', '37', '429', '34', '794', '7', 'Million'],
  },
  {
    cty: 'Slovakia',
    ctycode: '421',
    iso2: 'SK',
    iso3: 'SVK',
    rest: ['5', '455', '000', '48', '845', '96', '96', 'Billion'],
  },
  {
    cty: 'Slovenia',
    ctycode: '386',
    iso2: 'SI',
    iso3: 'SVN',
    rest: ['2', '007', '000', '20', '273', '46', '82', 'Billion'],
  },
  {
    cty: 'Solomon Islands',
    ctycode: '677',
    iso2: 'SB',
    iso3: 'SLB',
    rest: ['', '559', '198', '28', '450', '1', '099', 'Billion'],
  },
  {
    cty: 'Somalia',
    ctycode: '252',
    iso2: 'SO',
    iso3: 'SOM',
    rest: ['10', '112', '453', '637', '657', '2', '372', 'Billion'],
  },
  {
    cty: 'South Africa',
    ctycode: '27',
    iso2: 'ZA',
    iso3: 'ZAF',
    rest: [
      '',
      '49',
      '000',
      '000',
      '1',
      '219',
      '912',
      '353',
      '9',
      'Billion',
    ],
  },
  {
    cty: 'South Korea',
    ctycode: '82',
    iso2: 'KR',
    iso3: 'KOR',
    rest: ['', '48', '422', '644', '98', '480', '1', '198', 'Trillion'],
  },
  {
    cty: 'South Sudan',
    ctycode: '211',
    iso2: 'SS',
    iso3: 'SSD',
    rest: ['', '8', '260', '490', '644', '329', '11', '77', 'Billion'],
  },
  {
    cty: 'Spain',
    ctycode: '34',
    iso2: 'ES',
    iso3: 'ESP',
    rest: ['46', '505', '963', '504', '782', '1', '356', 'Trillion'],
  },
  {
    cty: 'Sri Lanka',
    ctycode: '94',
    iso2: 'LK',
    iso3: 'LKA',
    rest: ['', '21', '513', '990', '65', '610', '65', '12', 'Billion'],
  },
  {
    cty: 'Sudan',
    ctycode: '249',
    iso2: 'SD',
    iso3: 'SDN',
  },
  {
    cty: 'Suriname',
    ctycode: '597',
    iso2: 'SR',
    iso3: 'SUR',
  },
  {
    cty: 'Svalbard and Jan Mayen',
    ctycode: '47',
    iso2: 'SJ',
    iso3: 'SJM',
  },
  {
    cty: 'Swaziland',
    ctycode: '268',
    iso2: 'SZ',
    iso3: 'SWZ',
  },
  {
    cty: 'Sweden',
    ctycode: '46',
    iso2: 'SE',
    iso3: 'SWE',
  },
  {
    cty: 'Switzerland',
    ctycode: '41',
    iso2: 'CH',
    iso3: 'CHE',
  },
  {
    cty: 'Syria',
    ctycode: '963',
    iso2: 'SY',
    iso3: 'SYR',
  },
  {
    cty: 'Taiwan',
    ctycode: '886',
    iso2: 'TW',
    iso3: 'TWN',
    rest: ['22', '894', '384', '35', '980', '484', '7', 'Billion'],
  },
  {
    cty: 'Tajikistan',
    ctycode: '992',
    iso2: 'TJ',
    iso3: 'TJK',
    rest: ['7', '487', '489', '143', '100', '8', '513', 'Billion'],
  },
  {
    cty: 'Tanzania',
    ctycode: '255',
    iso2: 'TZ',
    iso3: 'TZA',
    rest: ['41', '892', '895', '945', '087', '31', '94', 'Billion'],
  },
  {
    cty: 'Thailand',
    ctycode: '66',
    iso2: 'TH',
    iso3: 'THA',
    rest: ['67', '089', '500', '514', '000', '400', '9', 'Billion'],
  },
  {
    cty: 'Togo',
    ctycode: '228',
    iso2: 'TG',
    iso3: 'TGO',
    rest: ['6', '587', '239', '56', '785', '4', '299', 'Billion'],
  },
  {
    cty: 'Tokelau',
    ctycode: '690',
    iso2: 'TK',
    iso3: 'TKL',
    rest: ['1', '466', '10'],
  },
  {
    cty: 'Tonga',
    ctycode: '676',
    iso2: 'TO',
    iso3: 'TON',
    rest: ['122', '580', '748', '477', 'Million'],
  },
  {
    cty: 'Trinidad and Tobago',
    ctycode: '1-868',
    iso2: 'TT',
    iso3: 'TTO',
    rest: [
      '868',
      'TT',
      'TTO',
      '1',
      '228',
      '691',
      '5',
      '128',
      '27',
      '13',
      'Billion',
    ],
  },
  {
    cty: 'Tunisia',
    ctycode: '216',
    iso2: 'TN',
    iso3: 'TUN',
    rest: ['10', '589', '025', '163', '610', '48', '38', 'Billion'],
  },
  {
    cty: 'Turkey',
    ctycode: '90',
    iso2: 'TR',
    iso3: 'TUR',
    rest: ['77', '804', '122', '780', '580', '821', '8', 'Billion'],
  },
  {
    cty: 'Turkmenistan',
    ctycode: '993',
    iso2: 'TM',
    iso3: 'TKM',
    rest: ['4', '940', '916', '488', '100', '40', '56', 'Billion'],
  },
  {
    cty: 'Turks and Caicos Islands',
    ctycode: '1-649',
    iso2: 'TC',
    iso3: 'TCA',
    rest: ['1', '649', 'TC', 'TCA', '20', '556', '430'],
  },
  {
    cty: 'Tuvalu',
    ctycode: '688',
    iso2: 'TV',
    iso3: 'TUV',
    rest: ['10', '472', '26', '38', 'Million'],
  },
  {
    cty: 'U.S. Virgin Islands',
    ctycode: '1-340',
    iso2: 'VI',
    iso3: 'VIR',
    rest: ['', '', '', '', '108', '708', '352'],
  },
  {
    cty: 'Uganda',
    ctycode: '256',
    iso2: 'UG',
    iso3: 'UGA',
    rest: ['33', '398', '682', '236', '040', '22', '6', 'Billion'],
  },
  {
    cty: 'Ukraine',
    ctycode: '380',
    iso2: 'UA',
    iso3: 'UKR',
    rest: ['45', '415', '596', '603', '700', '175', '5', 'Billion'],
  },
  {
    cty: 'United Arab Emirates',
    ctycode: '971',
    iso2: 'AR',
    iso3: 'ARE',
    rest: ['AE', 'ARE', '4', '975', '593', '82', '880', '390', 'Billion'],
  },
  {
    cty: 'United Kingdom',
    ctycode: '44',
    iso2: 'GB',
    iso3: 'GBR',
    rest: ['GBR', '62', '348', '447', '244', '820', '2', '49', 'Trillion'],
  },
  {
    cty: 'United States',
    ctycode: '1',
    iso2: 'US',
    iso3: 'USA',
  },
  {
    cty: 'Uruguay',
    ctycode: '598',
    iso2: 'UY',
    iso3: 'URY',
  },
  {
    cty: 'Uzbekistan',
    ctycode: '998',
    iso2: 'UZ',
    iso3: 'UZB',
  },
  {
    cty: 'Vanuatu',
    ctycode: '678',
    iso2: 'VU',
    iso3: 'VUT',
  },
  {
    cty: 'Vatican',
    ctycode: '379',
    iso2: 'VA',
    iso3: 'VAT',
  },
  {
    cty: 'Venezuela',
    ctycode: '58',
    iso2: 'VE',
    iso3: 'VEN',
  },
  {
    cty: 'Vietnam',
    ctycode: '84',
    iso2: 'VN',
    iso3: 'VNM',
  },
  {
    cty: 'Wallis and Futuna',
    ctycode: '689',
    iso2: 'WF',
    iso3: 'WLF',
  },
  {
    cty: 'Western Sahara',
    ctycode: '212',
    iso2: 'EH',
    iso3: 'ESH',
  },
  {
    cty: 'Yemen',
    ctycode: '967',
    iso2: 'YE',
    iso3: 'YEM',
  },
  {
    cty: 'Zambia',
    ctycode: '260',
    iso2: 'ZM',
    iso3: 'ZMB',
  },
  {
    cty: 'Zimbabwe',
    ctycode: '263',
    iso2: 'ZW',
    iso3: 'ZWE',
  },
];
