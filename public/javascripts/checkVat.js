var EU_code = {
    '73': 'FR',
    '81': 'DE',
    '203': 'SE',
    '56': 'CZ',
    '150': 'NL',
    '124': 'LU',
    '171': 'PT',
    '84': 'EL',
    '103': 'IE',
    '170': 'PL',
    '123': 'LT',
    '117': 'LV',
    '67': 'EE',
    '72': 'FI',
    '14': 'AT',
    '53': 'HR',
    '97': 'HU',
    '189': 'SK',
    '175': 'RO',
    '33': 'BG',
    '21': 'BE',
    '105': 'IT',
    '195': 'ES',
    '55': 'CY',
    '190': 'SI',
    '57': 'DK',
    '132': 'MT',
    '141': 'FR'
};
var EU_country = [21,73,81,105,150,124,57,103,195,84,171,14,203,72,132,55,170,97,56,189,190,67,117,123,175,33,53,141];
var other_eu_country = [98,27,236,242,126,2,140,160,204,5,122,182,245,70,85,87,75,134,137,12,250,243,228,222,244];
var other_eu_country_code = ["IS", "BA", "RS", "ME", "MK", "AL", "MD", "NO", "CH", "AD", "LI", "SM", "JE", "FO", "GL", "GP", "GF", "MQ", "YT", "AW", "IC", 'GG','GB','IM'];
// fairy add
var new_add_country = {
    _138: { // Mexico
        show_str: 'TAX ID',
        is_required: false,
        code: "MX",
        is_required_new: false,
        invalid_str: ""
    },
    _62: { // Ecuador
        show_str: 'RUC',
        is_required: false,
        code: "EC",
        is_required_new: false,
        invalid_str: ""
    },
    _13: { // Australia
        show_str: 'ABN',
        is_required: false,
        code: "AU",
        is_required_new: false,
        invalid_str: ""
    },
    _30: { // Brazil
        show_str: 'CNPJ*',
        is_required: true,
        placeholder: '00.000.000/0000-00',
        code: "BR",
        invalid_str: 'CPF*',
        is_required_new: true
    },
    _10: { // Argentina
        show_str: 'CUIT*',
        is_required: true,
        placeholder: '00-00000000-0',
        code: "AR",
        invalid_str: 'CUIL*',
        is_required_new: true
    },
    _43: { // Chile
        show_str: 'RUT*',
        is_required: true,
        code: "CL",
        is_required_new: false,
        invalid_str: ""
    }
}
function getVATNumberErrorTip(country_code,FStax_error) {
    var tip = 'Please enter a valid VAT NUMBER. eg: $VAT', vat = '';
    if (typeof FStax_error != 'undefined') {
        var tip = FStax_error;
    }
    switch (country_code) {
        case 'LU':
        case 'DK':
        case 'FT':
        case 'FI':
        case 'SI':
        case 'HU':
            vat = country_code + '12346578';
            break;
        case 'BE':
        case 'PL':
            vat = country_code + '1234657890';
            break;
        case 'SK':
            vat = country_code + '1111111111';
            break;
        case 'FR':
            vat = country_code + '00123456789';
            break;
        case 'IT':
        case 'LV':
        case 'HR':
            vat = country_code + '12346578901';
            break;
        case 'SE':
            vat = country_code + '123465789012';
            break;
        case 'NL':
            vat = country_code + '123465789B12';
            break;
        case 'IE':
            vat = country_code + '1234657';
            break;
        case 'AT':
            vat = country_code + 'U12346578';
            break;
        case 'ES':
            vat = country_code + 'B12346578';
            break;
        case 'BR':
            vat = '00.000.000/0000-00';
            break;
        default:
            vat = country_code + '123465789';
            break;
    }
    return tip.replace('$VAT', vat);
}
