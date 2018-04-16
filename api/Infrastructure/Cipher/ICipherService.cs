using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Infrastructure
{
    /// <summary>
    /// 加密解密服务
    /// </summary>
    public interface ICipherService
    {
        /// <summary>
        ///加密
        /// </summary>
        /// <param name="raw">原始数据</param>
        /// <param name="securitySeed">加密种子</param>
        /// <returns></returns>
        string Encrypt(string raw, string securitySeed);
        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="ciphertext"></param>
        /// <param name="securitySeed"></param>
        /// <returns></returns>
        string Decrypt(string ciphertext, string securitySeed);

        /// <summary>
        /// 生成随机的加密种子
        /// </summary>
        /// <returns></returns>
        string GetKey();
    }
}
