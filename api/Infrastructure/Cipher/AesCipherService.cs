using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Infrastructure
{
    public class AesCipherService : ICipherService
    {
        public int KeyCount { get; } = 16;
        private readonly int _offset = 2;

        public string Encrypt(string raw, string securitySeed)
        {
            securitySeed = DoKey(securitySeed);

            var encryptsecuritySeed = Encoding.UTF8.GetBytes(securitySeed);

            using (var aesAlg = Aes.Create())
            {
                using (var encryptor = aesAlg.CreateEncryptor(encryptsecuritySeed, Encoding.UTF8.GetBytes(GetIvByKey(securitySeed))))
                {
                    using (var msEncrypt = new MemoryStream())
                    {
                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (var swEncrypt = new StreamWriter(csEncrypt))
                            {
                                swEncrypt.Write(raw);
                            }
                        }

                        var encrypted = msEncrypt.ToArray();
                        return Convert.ToBase64String(encrypted);

                    }
                }
            }
        }

        private string GetIvByKey(string key)
        {
            if (key.Length != KeyCount)
            {
                throw new ArgumentException($"{nameof(key)} is illegal ", nameof(key));
            }
            char[] iv = new char[KeyCount];
            for (int i = 0; i < key.Length; i++)
            {
                iv[(i + _offset >= KeyCount ? i + _offset - KeyCount : i + _offset)] = key[i];
            }
            return new string(iv);

        }

        private string DoKey(string key)
        {
            if (key.Length > KeyCount)
            {
                key = key.Substring(0, KeyCount);
            }
            else
            {
                key = key.PadRight(KeyCount, '0');
            }
            return key;
        }


        public string Decrypt(string ciphertext, string securitySeed)
        {
            var fullCipher = Convert.FromBase64String(ciphertext);

            securitySeed = DoKey(securitySeed);

            var decryptKey = Encoding.UTF8.GetBytes(securitySeed);

            using (var aesAlg = Aes.Create())
            {
                using (var decryptor = aesAlg.CreateDecryptor(decryptKey, Encoding.UTF8.GetBytes(GetIvByKey(securitySeed))))
                {
                    string result;
                    using (var msDecrypt = new MemoryStream(fullCipher))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                result = srDecrypt.ReadToEnd();
                            }
                        }
                    }

                    return result;
                }
            }
        }

        /// <summary>
        /// 生成一个随机的字符串，字符串长度由<see cref="KeyCount"/>决定
        /// </summary>
        /// <returns></returns>
        public string GetKey()
        {
            return Guid.NewGuid().ToString().Substring(0, KeyCount);
        }
    }
}
